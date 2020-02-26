import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudyLevel } from '../model/study-level';
import { environment } from 'src/environments/environment';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudyLevelService {

  constructor(public http: HttpClient) { }

  public index(): Observable<StudyLevel[]> {
    return this.http.get(`${environment.api}/studyLevels`).pipe(
      take(1),
      map(response => response['StudyLevels'])
    );
  }
}
