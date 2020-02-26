import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { take, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Company } from '../model/company';
import { Employee } from '../model/employee';
import { User } from '../model/user';
import { Evaluation } from '../model/evaluation';
import { Category } from 'src/app/pages/user/category/category';
import { Domain } from 'src/app/pages/user/domain/domain';
import { Dimension } from 'src/app/pages/user/dimension/dimension';
import { Question } from 'src/app/pages/user/question/question';
import { SurveySection } from 'src/app/pages/user/surveySection/surveySection';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(public http: HttpClient) { }

  public create(company: Company): Observable<Company> {
    return this.http.post(`${environment.api}/companies`, {
      Company: company
    }).pipe(
      take(1),
      map(response => response['Company'])
    );
  }

  public show(oid: string): Observable<Company> {
    return this.http.get(`${environment.api}/companies/${oid}`).pipe(
      take(1),
      map(response => response['Company'])
    );
  }

  public update(oid: string, company: Company): Observable<Company> {
    return this.http.put(`${environment.api}/companies/${oid}`, {
      Company: company
    }).pipe(
      take(1),
      map(response => response['Company'])
    );
  }

  public getEmployees(oid: string): Observable<Employee[]> {
    return this.http.get(`${environment.api}/companies/${oid}/employees`).pipe(
      take(1),
      map(response => response['Employees'])
    );
  }

  public newEmployee(oid: string, user: User, employee: Employee, roleId: string): Observable<Employee> {
    return this.http.post(`${environment.api}/companies/${oid}/newEmployee`, {
      User: user,
      Employee: employee,
      RoleId: roleId
    }).pipe(
      take(1),
      map(response => response['Employees'])
    );
  }

  public getEvaluations(oid: string): Observable<Evaluation[]> {
    return this.http.get(`${environment.api}/companies/${oid}/evaluations`).pipe(
      take(1),
      map(response => response['Evaluations'])
    );
  }

  public getCategories(oid: string): Observable<Category[]> {
    return this.http.get(`${environment.api}/companies/${oid}/categories`).pipe(
      take(1),
      map(response => response['Categories'])
    );
  }

  public getDomains(oid: string): Observable<Domain[]> {
    return this.http.get(`${environment.api}/companies/${oid}/domains`).pipe(
      take(1),
      map(response => response['Domains'])
    );
  }

  public getDimensions(oid: string): Observable<Dimension[]> {
    return this.http.get(`${environment.api}/companies/${oid}/dimensions`).pipe(
      take(1),
      map(response => response['Dimensions'])
    );
  }

  public getQuestions(oid: string): Observable<Question[]> {
    return this.http.get(`${environment.api}/companies/${oid}/questions`).pipe(
      take(1),
      map(response => response['Questions'])
    );
  }

  public getSurveySections(oid: string): Observable<SurveySection[]> {
    return this.http.get(`${environment.api}/companies/${oid}/surveySections`).pipe(
      take(1),
      map(response => response['SurveySections'])
    );
  }
}
