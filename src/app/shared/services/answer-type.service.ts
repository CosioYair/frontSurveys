import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AnswerType } from '../model/answer-type';
import { url } from 'inspector';
import { take, map } from 'rxjs/operators';
import { AnswerGroup } from '../model/answer-group';

@Injectable({
  providedIn: 'root'
})
export class AnswerTypeService {

  constructor(public http: HttpClient) { }

  public index(): Observable<AnswerType[]> {
    return this.http.get(`${environment.api}/answerTypes`)
      .pipe(
        take(1),
        map(response => response['AnswerTypes'])
      );
  }

  public group(id: number): Observable<AnswerGroup[]> {
    return this.http.get(`${environment.api}/answerTypes/${id}/answerGroup`)
      .pipe(
        take(1),
        map(response => response['AnswerGroup'])
      );
  }

}
