import { PaypalBillingCycleFrequency } from './paypal-billing-cycle-frequency';
import { PaypalBillingCyclePricingScheme } from './paypal-billing-cycle-pricing-scheme';

export interface PaypalBillingCycle {
    frequency: PaypalBillingCycleFrequency;
    pricing_scheme: PaypalBillingCyclePricingScheme;
    total_cycles: number;
}
