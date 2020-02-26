import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CivilStatus } from '../model/civil-status';
import { environment } from 'src/environments/environment';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CivilStatusService {

  constructor(public http: HttpClient) { }

  public index(): Observable<CivilStatus[]> {
    return this.http.get(`${environment.api}/civilStatuses`).pipe(
      take(1),
      map(response => response['CivilStatuses'])
    );
  }
}
