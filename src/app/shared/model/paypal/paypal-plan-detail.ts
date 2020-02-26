import { PaypalBillingCycle } from './paypal-billing-cycle';

export interface PaypalPlanDetail {
    id: string;
    billing_cycles: PaypalBillingCycle[];
    description: string;
    name: string;
    product_id: string;
    status: string;
}
