import { Component, OnInit } from '@angular/core';
import { PaypalService } from 'src/app/shared/services/paypal.service';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/shared/model/company';
import { CompanyService } from 'src/app/shared/services/company.service';
import { User } from 'src/app/shared/model/user';
import { UserService } from 'src/app/shared/services/user.service';
import { JwtHelperService } from 'src/app/shared/services/jwt-helper.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-subscriptionbilling',
  templateUrl: './subscriptionbilling.component.html',
  styleUrls: ['./subscriptionbilling.component.scss']
})
export class SubscriptionbillingComponent implements OnInit {

  public planId: string;
  public planDetails: any = {};
  private _user: User = {} as User;
  private _company: Company = {} as Company;

  constructor(private _paypalService: PaypalService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _companyService: CompanyService,
    private _userService: UserService,
    private _jwtHelper: JwtHelperService,
    private _auhtService: AuthService
  ) {

  }

  ngOnInit() {
    this._userService.getUser.subscribe(user => {
      this._user = user;
      this.getCompany();
    });
    this.planId = this._route.snapshot.paramMap.get('planId');
    this.getPlanDetails();
  }

  getPlanDetails() {
    this._paypalService.getPlanDetails(this.planId)
      .pipe(
        take(1)
      ).subscribe(planDetails => {
        const intervalCount = planDetails.billing_cycles[0].frequency.interval_count;
        const intervalUnit = planDetails.billing_cycles[0].frequency.interval_unit;
        const totalCycles = planDetails.billing_cycles[0].total_cycles;
        const currency = planDetails.billing_cycles[0].pricing_scheme.fixed_price.currency_code;
        const value = planDetails.billing_cycles[0].pricing_scheme.fixed_price.value;
        this.planDetails = {
          id: planDetails.id,
          name: planDetails.name,
          description: planDetails.description,
          intervalCount,
          intervalUnit,
          totalCycles,
          currency,
          value
        };
      });
  }

  newSubscription(event) {
    const subscriptionId = event.subscriptionId;
    this.updateCompany(subscriptionId);
  }

  public getCompany() {
    this._companyService.show(this._user.companyOid).pipe(
      take(1)
    ).subscribe(company => {
      this._company = company;
    });
  }

  public updateCompany(subscriptionId: string) {
    this._company.paypalSubscriptionId = subscriptionId;
    this._companyService.update(this._company.Oid, this._company).pipe(
      take(1)
    ).subscribe(company => {
      const decodedJwt = this._jwtHelper.getDecodedJwt();
      decodedJwt.subscriptionId = company.paypalSubscriptionId;
      localStorage.setItem('subscriptionId', company.paypalSubscriptionId);
      this._auhtService.updateDecodedJwt(decodedJwt).then(user => {
        this._router.navigate(['/user/subscription']);
      });
    });
  }

}
