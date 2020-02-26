import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SurveyType } from '../model/survey-type';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SurveyTypeService {

  constructor(private http: HttpClient) { }

  public index(): Observable<SurveyType[]> {
    return this.http.get(`${environment.api}/surveyTypes`).pipe(
      map(response => response['SurveyTypes'])
    );
  }
}
