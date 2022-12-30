export interface CreateShopperInput {
  email_address: string;
  first_name: string;
  last_name: string;
  password: string;
  plan_id: string;
  billing_time: BillingTime;
  provider_customer_id: string;
}
export enum BillingTime {
  calendar,
  anniversary,
}
