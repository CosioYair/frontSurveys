import { Injectable } from '@angular/core';
import { JwtHelperService } from './jwt-helper.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DecodedJwt } from '../model/decoded-jwt';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { UserService } from './user.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { PaypalService } from './paypal.service';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private decodedJwt: BehaviorSubject<DecodedJwt> = new BehaviorSubject<DecodedJwt>({} as DecodedJwt);

  constructor(public http: HttpClient,
    public jwtHelper: JwtHelperService,
    public router: Router,
    public userService: UserService,
    private permissionsService: NgxPermissionsService,
    private paypalService: PaypalService
  ) {
    this.setDecodedJwt();
    //this.logout();
  }

  get getDecodedJwt(): Observable<DecodedJwt> {
    return this.decodedJwt.asObservable(); // {2}
  }

  public isAuthenticated(): boolean {
    const jwt = localStorage.getItem('jwt');
    return !this.jwtHelper.isTokenExpired(jwt);
  }

  public login(email: string, password: string): Observable<Promise<any>> {
    return this.http.post(`${environment.api}/auth`, {
      Email: email,
      Password: password
    }).pipe(
      take(1),
      map(response => {
        const jwt = response['Token'];
        localStorage.setItem('jwt', jwt);
        return this.setDecodedJwt();
        //return jwt;
      })
    );
  }

  public async setDecodedJwt(): Promise<any> {
    const decodeJwt = this.jwtHelper.getDecodedJwt();
    return await this.updateDecodedJwt(decodeJwt);
  }

  public async updateDecodedJwt(decodedJwt: DecodedJwt): Promise<any> {
    const privileges = decodedJwt.privileges ? decodedJwt.privileges.map(privilege => privilege.code) : [];
    this.permissionsService.loadPermissions(privileges);
    this.decodedJwt.next(decodedJwt);
    await this.paypalService.setSubcriptionDetails(decodedJwt);
    return this.userService.show(decodedJwt.Oid).toPromise().then(user => {
      this.userService.setUser(user);
      return user;
    }, (err) => {
      this.logout();
      return of({} as User);
    });
  }

  public signup(tagName: string, email: string, password: string, roleId: string): Observable<any> {
    return this.http.post(`${environment.api}/auth/signup`, {
      RoleId: roleId,
      User: {
        tagName,
        email,
        password
      }
    }).pipe(
      take(1),
      map(response => {
        const jwt = response['Token'];
        localStorage.setItem('jwt', jwt);
        return this.setDecodedJwt();
      })
    );
  }

  public async logout() {
    localStorage.clear();
    this.userService.setUser({} as User);
    this.router.navigate(['/auth']);
    this.permissionsService.flushPermissions();
    this.decodedJwt.next({} as DecodedJwt);
  }
}
