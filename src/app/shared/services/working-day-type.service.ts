import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkingDayType } from '../model/working-day-type';
import { environment } from 'src/environments/environment';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkingDayTypeService {

  constructor(public http: HttpClient) { }

  public index(): Observable<WorkingDayType[]> {
    return this.http.get(`${environment.api}/workingDayTypes`).pipe(
      take(1),
      map(response => response['WorkingDayTypes'])
    );
  }
}
