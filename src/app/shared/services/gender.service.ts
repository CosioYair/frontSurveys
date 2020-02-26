import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gender } from '../model/gender';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  constructor(public http: HttpClient) { }

  public index(): Observable<Gender[]> {
    return this.http.get(`${environment.api}/genders`).pipe(
      take(1),
      map(response => response['Genders'])
    );
  }
}
