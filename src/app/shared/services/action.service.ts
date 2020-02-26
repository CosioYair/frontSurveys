import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(public http: HttpClient) { }

  public newActionByUserEmail(email: string, actionId: number, url: string = null): Observable<any> {
    return this.http.post(`${environment.api}/actions/newActionByUserEmail`, {
      Email: email,
      ActionId: actionId,
      Url: url
    }).pipe(
      take(1),
      map(response => response['token'])
    );
  }

  public confirmToken(token: string, payload?: any): Observable<any> {
    return this.http.post(`${environment.api}/actions/confirmToken`, {
      Token: token,
      Payload: payload
    }).pipe(
      take(1)
    );
  }

}
