import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { take, map } from 'rxjs/operators';
import { Evaluation } from '../model/evaluation';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(public http: HttpClient) { }

  public create(employee: Employee): Observable<Employee> {
    return this.http.post(`${environment.api}/employees`, {
      Employee: employee
    }).pipe(
      take(1),
      map(response => response['Employee'])
    );
  }

  public show(oid: string): Observable<Employee> {
    return this.http.get(`${environment.api}/employees/${oid}`).pipe(
      take(1),
      map(response => response['Employee'])
    );
  }

  public update(oid: string, employee: Employee): Observable<Employee> {
    return this.http.put(`${environment.api}/employees/${oid}`, {
      Employee: employee
    }).pipe(
      take(1),
      map(response => response['Employee'])
    );
  }

  public delete(oid: string): Observable<Employee> {
    return this.http.delete(`${environment.api}/employees/${oid}`).pipe(
      take(1),
      map(response => response['Employee'])
    );
  }

  public getEvaluations(oid: string): Observable<Evaluation[]> {
    return this.http.get(`${environment.api}/employees/${oid}/getEvaluations`).pipe(
      take(1),
      map(response => response['Evaluations'])
    );
  }
}
