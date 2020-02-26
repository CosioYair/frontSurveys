import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { PaypalPlan } from '../model/paypal/paypal-plan';
import { PaypalPlanDetail } from '../model/paypal/paypal-plan-detail';
import { JwtHelperService } from './jwt-helper.service';
import { DecodedJwt } from '../model/decoded-jwt';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  private _cliendId: string = environment.paypal.clientId;
  private _secret: string = environment.paypal.secret;
  private _basicAuth: string = `Basic ${btoa(this._cliendId + ':' + this._secret)}`;
  private _headers: HttpHeaders = new HttpHeaders();
  private _subscriptionDetails: any = {};

  constructor(private _http: HttpClient, private _jwtHelper: JwtHelperService) {
    this._headers = this._headers.append('Authorization', this._basicAuth);
  }

  public get clientId(): string {
    return this._cliendId;
  }

  public get secret(): string {
    return this.secret;
  }

  public get basicAuth(): string {
    return this._basicAuth;
  }

  public get subscriptionDetails(): string {
    return this._subscriptionDetails;
  }

  public isSubscriptionActive(): boolean {
    return this._subscriptionDetails.status === 'ACTIVE';
  }

  setSubcriptionDetails(decodedJwt: DecodedJwt): Promise<any> {
    const subscriptionPrivilege = decodedJwt.privileges ? decodedJwt.privileges.find(privilege => privilege.code === 'SS') : null;
    const subscriptionId = decodedJwt.subscriptionId ? decodedJwt.subscriptionId : localStorage.getItem('subscriptionId');
    if (subscriptionPrivilege && subscriptionId) {
      return this.getSubcriptionDetails(subscriptionId).toPromise().then(subscriptionDetails => {
        this._subscriptionDetails = subscriptionDetails;
      });
    } else {
      this._subscriptionDetails = {};
      return new Promise<any>((resolve) => {
        resolve({});
      });
    }
  }

  getSubcriptionDetails(subcriptionId): Observable<any> {
    return this._http.get(`https://api.sandbox.paypal.com/v1/billing/subscriptions/${subcriptionId}`, { headers: this._headers });
  }

  getPlans(): Observable<PaypalPlan[]> {
    // tslint:disable-next-line: max-line-length
    return this._http.get(`https://api.sandbox.paypal.com/v1/billing/plans?product_id=${environment.paypal.productId}`, { headers: this._headers })
      .pipe(
        map(response => response['plans'])
      );
  }

  getPlanDetails(planId): Observable<PaypalPlanDetail> {
    return this._http.get<PaypalPlanDetail>(`https://api.sandbox.paypal.com/v1/billing/plans/${planId}`, { headers: this._headers });
  }

}
