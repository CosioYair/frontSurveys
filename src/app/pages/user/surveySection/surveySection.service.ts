import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SurveySection } from './surveySection';
import { environment } from 'src/environments/environment';
import { take, map } from 'rxjs/operators';
import { Question } from '../question/question';
import { SurveySectionQuestion } from 'src/app/shared/model/survey-section-question';

@Injectable({
  providedIn: 'root'
})
export class SurveySectionService {

  constructor(public http: HttpClient) { }

  public create(surveySection: SurveySection): Observable<SurveySection> {
    return this.http.post(`${environment.api}/surveySections`, {
      SurveySection: surveySection
    }).pipe(
      take(1),
      map(response => response['SurveySection'])
    );
  }

  public show(oid: string): Observable<SurveySection> {
    return this.http.get(`${environment.api}/surveySections/${oid}`).pipe(
      take(1),
      map(response => response['SurveySection'])
    );
  }

  public update(oid: string, surveySection: SurveySection): Observable<SurveySection> {
    return this.http.put(`${environment.api}/surveySections/${oid}`, {
      SurveySection: surveySection
    }).pipe(
      take(1),
      map(response => response['SurveySection'])
    );
  }

  public delete(oid: string): Observable<SurveySection> {
    return this.http.delete(`${environment.api}/surveySections/${oid}`).pipe(
      take(1),
      map(response => response['SurveySection'])
    );
  }

  public getQuestions(oid: string): Observable<Question[]> {
    return this.http.get(`${environment.api}/surveySections/${oid}/questions`).pipe(
      take(1),
      map(response => response['Questions'])
    );
  }

  public updateQuestions(oid: string, questions: SurveySectionQuestion[]): Observable<Question[]> {
    return this.http.put(`${environment.api}/surveySections/${oid}/questions`, {
      Questions: questions
    }).pipe(
      take(1),
      map(response => response['Questions'])
    );
  }
}
