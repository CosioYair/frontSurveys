import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { map } from 'rxjs/operators';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root'
})
export class ProfileCompletedGuard implements CanActivate {

  constructor(public userService: UserService, 
    public router: Router,
    private _permissionsService: NgxPermissionsService
    ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const companyPanePermission = this._permissionsService.getPermission('PE');
    return !companyPanePermission ? true : this.userService.hasCompany().pipe(
      map(hasCompany => {
        if (!hasCompany) {
          this.router.navigate(['/user/company']);
          return false;
        }
        return true;
      }));
  }

}
