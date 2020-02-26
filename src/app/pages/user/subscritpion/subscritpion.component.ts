import { Component, OnInit } from '@angular/core';
import { PaypalService } from 'src/app/shared/services/paypal.service';
import { take } from 'rxjs/operators';
import { PaypalPlanDetail } from 'src/app/shared/model/paypal/paypal-plan-detail';
import { IntervalUnit } from 'src/app/shared/enum/paypal/intervalUnit';

@Component({
  selector: 'app-subscritpion',
  templateUrl: './subscritpion.component.html',
  styleUrls: ['./subscritpion.component.scss']
})
export class SubscritpionComponent implements OnInit {

  public paypalPlans: any[] = [];
  public planDetails: PaypalPlanDetail = {} as PaypalPlanDetail;
  public planId: string;
  public IntervalUnit: any = IntervalUnit;
  public subscriptionDetails: any = {} as any;

  constructor(private _paypalService: PaypalService) {
  }

  ngOnInit() {
    if (!this._paypalService.isSubscriptionActive()) {
      this.getPlans();
    } else {
      this.subscriptionDetails = this._paypalService.subscriptionDetails;
      this._paypalService.getPlanDetails(this.subscriptionDetails.plan_id).pipe(
        take(1)
      ).subscribe(planDetails => {
        this.planDetails = planDetails;
      }, err => {
        console.log(err);
      });
    }
  }

  getPlans() {
    this._paypalService.getPlans()
      .pipe(
        take(1)
      ).subscribe(plans => {
        plans.map(plan => {
          this._paypalService.getPlanDetails(plan.id).pipe(
            take(1)
          ).subscribe(planDetails => {
            if (planDetails.status === 'ACTIVE') {
              this.addFormatedPlan(planDetails);
            }
          });
        });
      });
  }

  addFormatedPlan(planDetails: PaypalPlanDetail) {
    const intervalCount = planDetails.billing_cycles[0].frequency.interval_count;
    const intervalUnit = planDetails.billing_cycles[0].frequency.interval_unit;
    const totalCycles = planDetails.billing_cycles[0].total_cycles;
    const currency = planDetails.billing_cycles[0].pricing_scheme.fixed_price.currency_code;
    const value = planDetails.billing_cycles[0].pricing_scheme.fixed_price.value;
    this.paypalPlans.push({
      id: planDetails.id,
      name: planDetails.name,
      description: planDetails.description,
      intervalCount,
      intervalUnit,
      totalCycles,
      currency,
      value
    });
    this.paypalPlans.sort((a, b) => (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0));
    this.planId = this.paypalPlans[0].id;
  }

}
