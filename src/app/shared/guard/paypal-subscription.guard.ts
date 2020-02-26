import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PaypalService } from '../services/paypal.service';

@Injectable({
  providedIn: 'root'
})
export class PaypalSubscriptionGuard implements CanActivate {

  constructor(private _paypalService: PaypalService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this._paypalService.isSubscriptionActive()) {
      this.router.navigate(['/user/subscription']);
      return false;
    }
    return true;
  }

}
