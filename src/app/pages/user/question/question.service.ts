import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from './question';
import { environment } from 'src/environments/environment';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(public http: HttpClient) { }

  public create(question: Question): Observable<Question> {
    return this.http.post(`${environment.api}/questions`, {
      Question: question
    }).pipe(
      take(1),
      map(response => response['Question'])
    );
  }

  public show(oid: string): Observable<Question> {
    return this.http.get(`${environment.api}/questions/${oid}`).pipe(
      take(1),
      map(response => response['Question'])
    );
  }

  public update(oid: string, question: Question): Observable<Question> {
    return this.http.put(`${environment.api}/questions/${oid}`, {
      Question: question
    }).pipe(
      take(1),
      map(response => response['Question'])
    );
  }

  public delete(oid: string): Observable<Question> {
    return this.http.delete(`${environment.api}/questions/${oid}`).pipe(
      take(1),
      map(response => response['Question'])
    );
  }
}
