import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StaffType } from '../model/staff-type';
import { environment } from 'src/environments/environment';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StaffTypeService {

  constructor(public http: HttpClient) { }

  public index(): Observable<StaffType[]> {
    return this.http.get(`${environment.api}/staffTypes`).pipe(
      take(1),
      map(response => response['StaffTypes'])
    );
  }
}
