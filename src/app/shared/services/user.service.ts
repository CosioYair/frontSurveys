import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { take, map } from 'rxjs/operators';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { User } from '../model/user';
import { Employee } from '../model/employee';
import { Evaluation } from '../model/evaluation';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user$: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);

  constructor(public http: HttpClient) { }

  get getUser(): Observable<User> {
    return this._user$.asObservable();
  }

  public setUser(user: User) {
    this._user$.next(user);
  }

  public show(oid: string): Observable<User> {
    return this.http.get(`${environment.api}/users/${oid}`).pipe(
      take(1),
      map(response => response['User'])
    );
  }

  public update(oid: string, user: User): Observable<User> {
    return this.http.put(`${environment.api}/users/${oid}`, {
      User: user
    }).pipe(
      take(1),
      map(response => response['User'])
    );
  }

  public getEmployee(oid: string): Observable<Employee> {
    return this.http.get(`${environment.api}/users/${oid}/getEmployee`).pipe(
      take(1),
      map(response => response['Employee'])
    );
  }

  public hasCompany(): Observable<boolean> {
    return this.getUser.pipe(
      map(user => {
        return !!user.companyOid;
      })
    );
  }

  public getEvaluations(oid: string): Observable<Evaluation[]> {
    return this.http.get(`${environment.api}/users/${oid}/getEvaluations`).pipe(
      take(1),
      map(response => response['Evaluations'])
    );
  }
}
