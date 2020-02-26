import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { JwtHelperService } from './jwt-helper.service';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { DecodedJwt } from '../model/decoded-jwt';
import { SurveyQuest } from '../model/survey-quest';

@Injectable({
  providedIn: 'root'
})
export class SurveyQuestService {

  private decodedJwt: BehaviorSubject<DecodedJwt> = new BehaviorSubject<DecodedJwt>({} as DecodedJwt);
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService, ) { }


  public indexSurveyQuest(): Observable<SurveyQuest[]> {
    return this.http.get(`${environment.api}/surveyQuest`).pipe(
      map(response => response['surveyQuest'])
    );
  }


  public getSurveyQuest(oid: string): Observable<SurveyQuest> {
      return this.http.get(`${environment.api}/surveyQuest/${oid}`).pipe(
        take(1),
        map(response => response["surveyQuest"])
      );
  }

  public postSurveyQuest(surveyQuest: SurveyQuest) {
    return this.http.post(`${environment.api}/surveyQuest`, {
      SurveyQuest: surveyQuest
    });
  }

  public putSurveyQuest(oid: string, survyeQuest: SurveyQuest): Observable<SurveyQuest> {
    return this.http.put(`${environment.api}/surveyQuest/${oid}`, {
      SurveyQuest: survyeQuest
    })
      .pipe(
        take(1), map(response => response["surveyQuest"])
      );
  }

  public removeSurveyQuest(oid: string): Observable<SurveyQuest> {
    return this.http.delete(`${environment.api}/surveyQuest/${oid}`).pipe(
      take(1),
      map(response => response["surveyQuest"])
    );
  }


}
