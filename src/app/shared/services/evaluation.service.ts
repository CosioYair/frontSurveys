import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Evaluation } from '../model/evaluation';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { take, map } from 'rxjs/operators';
import { Employee } from '../model/employee';
import { EmployeeEvaluation } from '../model/employee-evaluation';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  constructor(public http: HttpClient) { }

  public create(evaluation: Evaluation): Observable<Evaluation> {
    return this.http.post(`${environment.api}/evaluations`, {
      Evaluation: evaluation
    }).pipe(
      take(1),
      map(response => response['Evaluation'])
    );
  }

  public show(oid: string): Observable<Evaluation> {
    return this.http.get(`${environment.api}/evaluations/${oid}`).pipe(
      take(1),
      map(response => response['Evaluation'])
    );
  }

  public update(oid: string, evaluation: Evaluation): Observable<Evaluation> {
    return this.http.put(`${environment.api}/evaluations/${oid}`, {
      Evaluation: evaluation
    }).pipe(
      take(1),
      map(response => response['Evaluation'])
    );
  }

  public delete(oid: string): Observable<Evaluation> {
    return this.http.delete(`${environment.api}/evaluations/${oid}`).pipe(
      take(1),
      map(response => response['Evaluation'])
    );
  }

  public setRandomEmployees(evaluationOid: string, employeesNumber: number): Observable<EmployeeEvaluation[]> {
    return this.http.post(`${environment.api}/evaluations/${evaluationOid}/setRandomEmployees`, {
      EmployeesNumber: employeesNumber
    }).pipe(
      take(1),
      map(response => response['EmployeeEvaluations'])
    );
  }

  public getPercentageFinished(oid: string): Observable<number> {
    return this.http.get(`${environment.api}/evaluations/${oid}/getPercentageFinished`).pipe(
      take(1),
      map(response => response['PercentageFinished'])
    );
  }
}
