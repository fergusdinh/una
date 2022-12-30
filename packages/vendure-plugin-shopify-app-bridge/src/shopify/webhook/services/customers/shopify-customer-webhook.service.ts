import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import {
  TransactionalConnection,
  Customer,
  CustomerService,
  RequestContext,
  ChannelService,
  Channel,
  Address,
  CountryService,
  Country,
  ID,
  Logger,
  Translated,
} from '@vendure/core';
import {
  AddressWebhookShopify,
  CustomerDeleteWebhookShopify,
  CustomerWebhookShopify,
  ShopifyCountryCode,
} from '../../types';
import { ErrorResultUnion } from '@vendure/core/dist/common/error/error-result';
import { CreateCustomerResult } from '@vendure/common/lib/generated-types';
import { loggerCtx } from '../../../../constants';
import path from 'path';
import parsePhoneNumber, { PhoneNumber } from 'libphonenumber-js';

@Injectable()
export class ShopifyCustomerWebhookService implements OnApplicationBootstrap {
  constructor(
    private readonly connection: TransactionalConnection,
    private readonly customerService: CustomerService,
    private readonly channelService: ChannelService,
    private readonly countryService: CountryService
  ) {}

  async onApplicationBootstrap(): Promise<void> {}

  async createCustomer<C extends CustomerWebhookShopify>(
    ctx: RequestContext,
    data: C,
    domain: string,
    channel: Channel
  ): Promise<ErrorResultUnion<CreateCustomerResult, Customer> | undefined> {
    try {
      const isExistCustomer = await this.connection
        .getRepository(Customer)
        .findOne({
          emailAddress: data.email,
          deletedAt: null,
        });
      if (isExistCustomer) {
        /* update shopify_customer_id field */
        await this.connection.getRepository(Customer).update(
          { id: isExistCustomer.id },
          {
            customFields: { shopify_customer_id: String(data.id) },
          }
        );
      } else {
        const phoneNumber = await this.getCountryCodeFormNumberPhone(
          ctx,
          data,
          channel
        );
        const customer = (await this.customerService.create(ctx, {
          firstName: data.first_name,
          lastName: data.last_name,
          emailAddress: data.email,
          phoneNumber: data.phone,
          title: data.first_name + ' ' + data.last_name,
          customFields: {
            shopify_customer_id: String(data.id),
            country_select: phoneNumber && phoneNumber.country,
            created_from: 'shopify',
            updated_from: 'shopify',
            created_by: domain,
          },
        })) as Customer;
        await this.customerService.addNoteToCustomer(ctx, {
          id: customer.id,
          note: data.note,
          isPublic: true,
        });
        await this.createAddressForCustomer(ctx, data, customer, channel);
        await this.channelService.assignToChannels(ctx, Customer, customer.id, [
          channel.id,
        ]);
        return customer;
      }
    } catch (error) {
      const scriptName = path.basename(__filename);
      Logger.error(`${scriptName} --- ${error}`, loggerCtx);
    }
  }

  async createAddressForCustomer(
    ctx: RequestContext,
    data: CustomerWebhookShopify,
    customer: Customer,
    channel: Channel
  ): Promise<Address[] | undefined> {
    try {
      const addresses: Address[] = [];
      for (const address of data.addresses) {
        await this.isExistCountry(ctx, address, channel);
        if (address.country_code) {
          await this.customerService.createAddress(ctx, customer.id, {
            fullName: address.name,
            company: address.company,
            streetLine1: address.address1,
            streetLine2: address.address2,
            city: address.city,
            province: address.province ? address.province : '',
            postalCode: address.zip,
            countryCode: address.country_code,
            phoneNumber: address.phone,
            defaultShippingAddress: address.default,
            defaultBillingAddress: address.default,
            customFields: {
              shopify_customer_id: String(address.customer_id),
              shopify_address_id: String(address.id),
            },
          });
        } else {
          return;
        }
      }
      return addresses;
    } catch (error) {
      const scriptName = path.basename(__filename);
      Logger.error(`${scriptName} --- ${error}`, loggerCtx);
    }
  }

  async deleteCustomer(
    ctx: RequestContext,
    customerShopifyId: CustomerDeleteWebhookShopify
  ): Promise<void> {
    try {
      const customerId = await this.connection.getRepository(Customer).findOne({
        select: ['id'],
        where: {
          customFields: {
            shopify_customer_id: String(customerShopifyId),
          },
          deletedAt: null,
        },
      });
      if (customerId) {
        await this.customerService.softDelete(ctx, customerId.id);
      }
    } catch (error) {
      const scriptName = path.basename(__filename);
      Logger.error(`${scriptName} --- ${error}`, loggerCtx);
    }
  }

  async updateCustomer(
    ctx: RequestContext,
    data: CustomerWebhookShopify,
    channel: Channel
  ): Promise<void> {
    try {
      const customerId = await this.connection.getRepository(Customer).findOne({
        select: ['id'],
        where: {
          customFields: {
            shopify_customer_id: String(data.id),
          },
          deletedAt: null,
        },
      });
      if (customerId) {
        const phoneNumber = await this.getCountryCodeFormNumberPhone(
          ctx,
          data,
          channel
        );
        await this.customerService.update(ctx, {
          id: customerId.id,
          lastName: data.last_name,
          phoneNumber: data.phone,
          title: data.first_name + ' ' + data.last_name,
          firstName: data.first_name,
          emailAddress: data.email,
          customFields: {
            country_select: phoneNumber && phoneNumber.country,
            updated_from: 'shopify',
          },
        });
        await this.updateAddressForCustomer(ctx, customerId.id, data, channel);
      }
    } catch (error) {
      const scriptName = path.basename(__filename);
      Logger.error(`${scriptName} --- ${error}`, loggerCtx);
    }
  }

  async updateAddressForCustomer(
    ctx: RequestContext,
    customerId: ID,
    data: CustomerWebhookShopify,
    channel: Channel
  ): Promise<void> {
    try {
      const addressesAvailableOfCustomer =
        (await this.customerService.findAddressesByCustomerId(
          ctx,
          customerId
        )) as Address[];
      if (data.addresses.length > addressesAvailableOfCustomer.length) {
        const newAddresses = data.addresses.filter((address) => {
          return !addressesAvailableOfCustomer.find(
            (addressAvailableOfCustomer) => {
              const iAddressAvailableOfCustomer =
                addressAvailableOfCustomer as unknown as Omit<
                  Translated<Address>,
                  'customFields'
                > & { customFields: { shopify_address_id: string } };
              return (
                String(address.id) ===
                iAddressAvailableOfCustomer.customFields.shopify_address_id
              );
            }
          );
        });
        for (const newAddress of newAddresses) {
          const customerId = await this.connection
            .getRepository(Customer)
            .findOne({
              select: ['id'],
              where: {
                customFields: {
                  shopify_customer_id: String(newAddress.customer_id),
                },
                deletedAt: null,
              },
            });
          if (customerId) {
            await this.isExistCountry(ctx, newAddress, channel);
            if (newAddress.country_code) {
              await this.customerService.createAddress(ctx, customerId.id, {
                fullName: newAddress.name ? newAddress.name : '',
                company: newAddress.company ? newAddress.company : '',
                streetLine1: newAddress.address1 ? newAddress.address1 : '',
                streetLine2: newAddress.address2 ? newAddress.address2 : '',
                city: newAddress.city ? newAddress.city : '',
                province: newAddress.province ? newAddress.province : '',
                postalCode: newAddress.zip ? newAddress.zip : '',
                countryCode: newAddress.country_code
                  ? newAddress.country_code
                  : '',
                phoneNumber: newAddress.phone ? newAddress.phone : '',
                defaultShippingAddress: newAddress.default,
                defaultBillingAddress: newAddress.default,
                customFields: {
                  shopify_customer_id: String(newAddress.customer_id),
                  shopify_address_id: String(newAddress.id),
                },
              });
            } else {
              return;
            }
          }
        }
      } else if (data.addresses.length < addressesAvailableOfCustomer.length) {
        const deleteAddresses = addressesAvailableOfCustomer.filter(
          (addressAvailableOfCustomer) => {
            const iAddressAvailableOfCustomer =
              addressAvailableOfCustomer as unknown as Omit<
                Translated<Address>,
                'customFields'
              > & { customFields: { shopify_address_id: string } };
            return !data.addresses.find((address) => {
              return (
                String(address.id) ===
                iAddressAvailableOfCustomer.customFields.shopify_address_id
              );
            });
          }
        );
        for (const deleteAddress of deleteAddresses) {
          await this.customerService.deleteAddress(ctx, deleteAddress.id);
        }
      } else {
        for (const address of data.addresses) {
          for (const addressAvailableOfCustomer of addressesAvailableOfCustomer) {
            const iAddressAvailableOfCustomer =
              addressAvailableOfCustomer as unknown as Omit<
                Translated<Address>,
                'customFields'
              > & { customFields: { shopify_address_id: string } };
            if (
              iAddressAvailableOfCustomer.customFields.shopify_address_id !== ''
            ) {
              if (
                String(address.id) ===
                iAddressAvailableOfCustomer.customFields.shopify_address_id
              ) {
                await this.isExistCountry(ctx, address, channel);
                if (address.country_code) {
                  await this.customerService.updateAddress(ctx, {
                    id: iAddressAvailableOfCustomer.id,
                    fullName: address.name ? address.name : '',
                    company: address.company ? address.company : '',
                    streetLine1: address.address1 ? address.address1 : '',
                    streetLine2: address.address2 ? address.address2 : '',
                    city: address.city ? address.city : '',
                    province: address.province ? address.province : '',
                    postalCode: address.zip ? address.zip : '',
                    countryCode: address.country_code
                      ? address.country_code
                      : '',
                    phoneNumber: address.phone ? address.phone : '',
                    defaultShippingAddress: address.default,
                    defaultBillingAddress: address.default,
                  });
                } else {
                  return;
                }
              }
            } else {
              if (address.phone === iAddressAvailableOfCustomer.phoneNumber) {
                await this.customerService.updateAddress(ctx, {
                  id: iAddressAvailableOfCustomer.id,
                  customFields: {
                    shopify_customer_id: String(address.customer_id),
                    shopify_address_id: String(address.id),
                  },
                });
              }
            }
          }
        }
      }
    } catch (error) {
      const scriptName = path.basename(__filename);
      Logger.error(`${scriptName} --- ${error}`, loggerCtx);
    }
  }

  private async isExistCountry<A extends AddressWebhookShopify>(
    ctx: RequestContext,
    address: A,
    channel: Channel
  ): Promise<void> {
    try {
      if (!address.country_code || !address.country_name) {
        return;
      } else {
        const isExistCountry = await this.connection
          .getRepository(Country)
          .findOne({
            code: address.country_code,
          });
        if (!isExistCountry) {
          await this.countryService.create(ctx, {
            code: address.country_code,
            enabled: true,
            translations: [
              {
                languageCode: channel.defaultLanguageCode,
                name: address.country_name,
              },
            ],
          });
        }
      }
    } catch (error) {
      const scriptName = path.basename(__filename);
      Logger.error(`${scriptName} --- ${error}`, loggerCtx);
    }
  }

  private async getCountryCodeFormNumberPhone<C extends CustomerWebhookShopify>(
    ctx: RequestContext,
    data: C,
    channel: Channel
  ): Promise<PhoneNumber | undefined> {
    try {
      const phoneNumber = parsePhoneNumber(data.phone);
      if (phoneNumber) {
        const isExistCountry = await this.connection
          .getRepository(Country)
          .findOne({
            code: phoneNumber.country,
          });
        if (!isExistCountry) {
          await this.countryService.create(ctx, {
            code: phoneNumber.country as string,
            enabled: true,
            translations: [
              {
                languageCode: channel.defaultLanguageCode,
                name: ShopifyCountryCode[
                  phoneNumber.country as keyof typeof ShopifyCountryCode
                ],
              },
            ],
          });
        }
        return phoneNumber;
      }
    } catch (error) {
      const scriptName = path.basename(__filename);
      Logger.error(`${scriptName} --- ${error}`, loggerCtx);
    }
  }
}
