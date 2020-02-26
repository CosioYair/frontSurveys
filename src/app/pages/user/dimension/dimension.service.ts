import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dimension } from './dimension';
import { environment } from 'src/environments/environment';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DimensionService {

  constructor(public http: HttpClient) { }

  public create(dimension: Dimension): Observable<Dimension> {
    return this.http.post(`${environment.api}/dimensions`, {
      Dimension: dimension
    }).pipe(
      take(1),
      map(response => response['Dimension'])
    );
  }

  public show(oid: string): Observable<Dimension> {
    return this.http.get(`${environment.api}/dimensions/${oid}`).pipe(
      take(1),
      map(response => response['Dimension'])
    );
  }

  public update(oid: string, dimension: Dimension): Observable<Dimension> {
    return this.http.put(`${environment.api}/dimensions/${oid}`, {
      Dimension: dimension
    }).pipe(
      take(1),
      map(response => response['Dimension'])
    );
  }

  public delete(oid: string): Observable<Dimension> {
    return this.http.delete(`${environment.api}/dimensions/${oid}`).pipe(
      take(1),
      map(response => response['Dimension'])
    );
  }
}
