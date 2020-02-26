import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../model/role';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(public http: HttpClient) { }

  public index(): Observable<Role[]> {
    return this.http.get(`${environment.api}/roles`).pipe(
      take(1),
      map(response => response['Roles'])
    );
  }
}
