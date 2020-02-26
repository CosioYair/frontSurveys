import { Component, ViewChild, ElementRef, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { PaypalOrder } from '../../model/paypal/paypal-order';
import { NgxUiLoaderService } from 'ngx-ui-loader';
declare var paypal;
@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnChanges {

  @Input() planId: string;
  @Input() order: PaypalOrder;
  @Output() NewSubscription = new EventEmitter();
  @Output() NewOrder = new EventEmitter();

  public paidOut: boolean;
  public paidOutError: boolean;
  public paidOutCanceled: boolean;

  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;

  constructor(private _ngxService: NgxUiLoaderService,
  ) { }

  ngOnChanges() {
    if (this.planId || this.order) {
      this.planId ? this.createSubscription() : this.createOrder();
    }
  }

  createOrder() {
    paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            description: this.order.description,
            amount: {
              currency_code: 'MXN',
              value: this.order.price
            }
          }]
        });
      },
      onApprove: async (data, actions) => {
        this._ngxService.start();
        const order = await actions.order.capture();
        this.NewOrder.emit({ orderId: order.id });
        this._ngxService.stop();
        this.paidOut = true;
        this.paidOutCanceled = false;
      },
      onCancel: (data) => {
        this.paidOut = undefined;
        this.paidOutCanceled = true;
      },
      onError: (err) => {
        this.paidOutCanceled = false;
        this.paidOut = false;
      }
    }).render(this.paypalElement.nativeElement);
  }

  createSubscription() {
    paypal.Buttons({
      createSubscription: (data, actions) => {
        return actions.subscription.create({
          plan_id: this.planId,
        });
      },
      onApprove: (data, actions) => {
        this.NewSubscription.emit({ subscriptionId: data.subscriptionID });
        this.paidOut = true;
        this.paidOutCanceled = false;
      },
      onCancel: (data) => {
        this.paidOut = undefined;
        this.paidOutCanceled = true;
      },
      onError: (err) => {
        this.paidOutCanceled = false;
        this.paidOut = false;
      }
    }).render(this.paypalElement.nativeElement);
  }

}
