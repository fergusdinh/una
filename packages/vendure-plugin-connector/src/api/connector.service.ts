import { ModuleRef } from '@nestjs/core';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import {
  Injector,
  EventBus,
  Logger,
  TransactionalConnection,
  VendureEvent,
  ProductEvent,
  ProductVariantChannelEvent,
  ProductVariantEvent,
  AccountRegistrationEvent,
  AccountVerifiedEvent,
  AdministratorEvent,
  AssetChannelEvent,
  AssetEvent,
  AttemptedLoginEvent,
  ChangeChannelEvent,
  ChannelEvent,
  CollectionEvent,
  CollectionModificationEvent,
  CountryEvent,
  CouponCodeEvent,
  CustomerAddressEvent,
  CustomerEvent,
  ZoneMembersEvent,
  CustomerGroupEntityEvent,
  CustomerGroupChangeEvent,
  FacetEvent,
  FacetValueEvent,
  FulfillmentEvent,
  FulfillmentStateTransitionEvent,
  GlobalSettingsEvent,
  HistoryEntryEvent,
  IdentifierChangeEvent,
  IdentifierChangeRequestEvent,
  LoginEvent,
  LogoutEvent,
  OrderEvent,
  OrderLineEvent,
  OrderPlacedEvent,
  OrderStateTransitionEvent,
  PasswordResetEvent,
  PasswordResetVerifiedEvent,
  PaymentMethodEvent,
  PaymentStateTransitionEvent,
  ProductChannelEvent,
  ProductOptionEvent,
  ProductOptionGroupChangeEvent,
  ProductOptionGroupEvent,
  PromotionEvent,
  RefundStateTransitionEvent,
  RoleChangeEvent,
  RoleEvent,
  SearchEvent,
  ShippingMethodEvent,
  StockMovementEvent,
  TaxCategoryEvent,
  TaxRateEvent,
  ZoneEvent,
} from '@vendure/core';
import { ConnectorChannelEntity } from './entities/connector/connector-channel.entity';
import { ConnectorPlugin } from '../connector.plugin';
import { loggerCtx } from '../constants';

@Injectable()
export class ConnectorService implements OnApplicationBootstrap {
  static queue = new Set<string>();

  constructor(
    private eventBus: EventBus,
    private connection: TransactionalConnection,
    private moduleRef: ModuleRef
  ) {}

  async getAllConnectors(
    channelId: string
  ): Promise<ConnectorChannelEntity[] | undefined> {
    return this.connection
      .getRepository(ConnectorChannelEntity)
      .find({ channelId: String(channelId) });
  }

  async getConnectorByType(
    channelId: string,
    type: string
  ): Promise<ConnectorChannelEntity | undefined> {
    return this.connection
      .getRepository(ConnectorChannelEntity)
      .findOne({ channelId: String(channelId), type });
  }

  async deleteConnector(channelId: string, type: string) {
    return await this.connection.getRepository(ConnectorChannelEntity).delete({
      channelId: String(channelId),
      type,
    });
  }

  async saveConnector(
    channelId: string,
    connectorSettings: string,
    type: string
  ): Promise<ConnectorChannelEntity | undefined> {
    const existingConnectors = await this.connection
      .getRepository(ConnectorChannelEntity)
      .find({ channelId: String(channelId) });
    if (existingConnectors.length > 0) {
      const connectorsUpdate = existingConnectors.find((connector) => {
        return connector.type === type;
      });
      if (connectorsUpdate) {
        await this.connection.getRepository(ConnectorChannelEntity).update(
          { id: connectorsUpdate.id },
          {
            channelId: String(channelId),
            settings: connectorSettings,
            type: type,
          }
        );
      } else {
        await this.connection.getRepository(ConnectorChannelEntity).save({
          channelId: String(channelId),
          settings: connectorSettings,
          type: type,
        });
      }
    } else {
      await this.connection.getRepository(ConnectorChannelEntity).save({
        channelId: String(channelId),
        settings: connectorSettings,
        type: type,
      });
    }
    return this.getConnectorByType(channelId, type);
  }

  async onApplicationBootstrap(): Promise<void> {
    if (
      !ConnectorPlugin.options ||
      !ConnectorPlugin.options.connectors ||
      ConnectorPlugin.options.connectors.length === 0
    ) {
      throw Error(
        `Please specify Connectors with Connector.init() in your Vendure config.`
      );
    }

    if (
      !ConnectorPlugin.options ||
      !ConnectorPlugin.options.entities ||
      ConnectorPlugin.options.entities.length === 0
    ) {
      throw Error(
        `Please specify Entites with Connector.init() in your Vendure config.`
      );
    }
    if (ConnectorPlugin.options.disabled) {
      Logger.info(`Connector plugin disabled`, loggerCtx);
      return;
    }
    [
      ProductEvent,
      ProductVariantChannelEvent,
      ProductVariantEvent,
      AccountRegistrationEvent,
      AccountVerifiedEvent,
      AdministratorEvent,
      AssetChannelEvent,
      AssetEvent,
      AttemptedLoginEvent,
      ChangeChannelEvent,
      ChannelEvent,
      CollectionEvent,
      CollectionModificationEvent,
      CountryEvent,
      CouponCodeEvent,
      CustomerAddressEvent,
      CustomerEvent,
      CustomerGroupEntityEvent,
      CustomerGroupChangeEvent,
      FacetEvent,
      FacetValueEvent,
      FulfillmentEvent,
      FulfillmentStateTransitionEvent,
      GlobalSettingsEvent,
      HistoryEntryEvent,
      IdentifierChangeEvent,
      IdentifierChangeRequestEvent,
      LoginEvent,
      LogoutEvent,
      OrderEvent,
      OrderLineEvent,
      OrderPlacedEvent,
      OrderStateTransitionEvent,
      PasswordResetEvent,
      PasswordResetVerifiedEvent,
      PaymentMethodEvent,
      PaymentStateTransitionEvent,
      ProductChannelEvent,
      ProductOptionEvent,
      ProductOptionGroupChangeEvent,
      ProductOptionGroupEvent,
      PromotionEvent,
      RefundStateTransitionEvent,
      RoleChangeEvent,
      RoleEvent,
      SearchEvent,
      ShippingMethodEvent,
      StockMovementEvent,
      TaxCategoryEvent,
      TaxRateEvent,
      ZoneEvent,
      ZoneMembersEvent,
    ].forEach((event) => {
      this.eventBus.ofType(event).subscribe(async (event_subscribed) => {
        const userLogin = (event_subscribed as any)?.ctx?.session;
        if (
          userLogin &&
          userLogin?.user &&
          userLogin?.user?.channelPermissions
        ) {
          for (const channelId of userLogin.user.channelPermissions) {
            if (!channelId.id) {
              Logger.error(
                `Cannnot trigger connector for event ${event_subscribed.constructor.name}, x`,
                loggerCtx
              );
              return;
            }
            const connectorsChannel = await this.getAllConnectors(channelId.id);
            if (connectorsChannel && connectorsChannel.length > 0) {
              for (const connectorChannel of connectorsChannel) {
                // get settings
                const settings = JSON.parse(connectorChannel.settings);
                // get events register
                const eventsRegister = settings?.events;
                // check if no events register => return
                if (eventsRegister.length === 0) {
                  return;
                }
                for (const eventsRegisterName of eventsRegister) {
                  // check events register with all event
                  if (
                    eventsRegisterName === event_subscribed.constructor.name
                  ) {
                    ConnectorService.queue.add(settings);
                    this.addToQueue(event_subscribed, connectorChannel.type) // Async, because we dont want failures in Vendure if a connector fails
                      .catch((e) =>
                        Logger.error(
                          `Failed to call connector for event ${event_subscribed.constructor.name} for channel ${channelId.id}`,
                          loggerCtx,
                          e
                        )
                      );
                  }
                }
              }
            }
          }
        }
      });
    });
  }

  async addToQueue(event: VendureEvent, type: string): Promise<void> {
    // check if you have options deplay
    if (ConnectorPlugin.options.delay) {
      setTimeout(
        () => this.doConnector(event, type),
        ConnectorPlugin.options.delay
      );
    } else {
      await this.doConnector(event, type);
    }
  }

  async doConnector(event: VendureEvent, type: string): Promise<void> {
    // Check if queue already handled
    if (ConnectorService.queue.size === 0) {
      return;
    }
    // Copy queue, and empty original
    const channels = Array.from(ConnectorService.queue);
    ConnectorService.queue.clear();
    await Promise.all(
      channels.map(async (channel: any) => {
        delete channel?.events;
        const connectors = ConnectorPlugin.options.connectors;
        for (const connector of connectors) {
          connector.doWebhook(
            type,
            event,
            channel,
            new Injector(this.moduleRef)
          );
        }
      })
    );
  }
}
