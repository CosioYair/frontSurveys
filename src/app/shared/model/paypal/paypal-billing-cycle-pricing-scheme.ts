import { PaypalFixedPrice } from './paypal-fixed-price';

export interface PaypalBillingCyclePricingScheme {
    create_time: Date;
    fixed_price: PaypalFixedPrice;
    update_time: Date;
    version: number;
}
