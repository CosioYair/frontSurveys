import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { take, map } from 'rxjs/operators';
import { PositionType } from '../model/position-type';

@Injectable({
  providedIn: 'root'
})
export class PositionTypeService {

  constructor(public http: HttpClient) { }

  public index(): Observable<PositionType[]> {
    return this.http.get(`${environment.api}/positionTypes`).pipe(
      take(1),
      map(response => response['PositionTypes'])
    );
  }
}
