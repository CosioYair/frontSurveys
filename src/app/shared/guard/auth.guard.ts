import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const noAuth = next.data.noAuth;
    const isAuthenticated = this.auth.isAuthenticated();
    if (noAuth) {
      if (isAuthenticated) {
        this.router.navigate(['/user']);
        return false;
      }
    } else if (!isAuthenticated) {
      this.router.navigate(['auth']);
      return false;
    }
    return true;
  }

}
