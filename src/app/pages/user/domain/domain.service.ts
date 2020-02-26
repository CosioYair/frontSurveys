import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Domain } from './domain';
import { environment } from 'src/environments/environment';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DomainService {

  constructor(public http: HttpClient) { }

  public create(domain: Domain): Observable<Domain> {
    return this.http.post(`${environment.api}/domains`, {
      Domain: domain
    }).pipe(
      take(1),
      map(response => response['Domain'])
    );
  }

  public show(oid: string): Observable<Domain> {
    return this.http.get(`${environment.api}/domains/${oid}`).pipe(
      take(1),
      map(response => response['Domain'])
    );
  }

  public update(oid: string, domain: Domain): Observable<Domain> {
    return this.http.put(`${environment.api}/domains/${oid}`, {
      Domain: domain
    }).pipe(
      take(1),
      map(response => response['Domain'])
    );
  }

  public delete(oid: string): Observable<Domain> {
    return this.http.delete(`${environment.api}/domains/${oid}`).pipe(
      take(1),
      map(response => response['Domain'])
    );
  }
}
