import { PaypalProduct } from './paypal-product';

export interface PaypalOrder {
    price: number;
    description: string;
    img?: string;
    items?: PaypalProduct[];
}
