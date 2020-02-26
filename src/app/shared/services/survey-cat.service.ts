import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { JwtHelperService } from './jwt-helper.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SurveyCat } from '../model/survey-cat';


@Injectable({
  providedIn: 'root'
})
export class SurveyCatService {

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService, ) { }

  public index(): Observable<SurveyCat[]> {
    return this.http.get(`${environment.api}/surveyCats`).pipe(
      map(response => response['SurveyCats'])
    );
  }


  public get(oid: string): Observable<SurveyCat> {
      return this.http.get(`${environment.api}/surveyCats/${oid}`).pipe(
        take(1),
        map(response => response["SurveyCat"])
      );
  }

  public post(SurveyCat: SurveyCat) {
    return this.http.post(`${environment.api}/surveyCats`, {
      SurveyCat: SurveyCat
    });
  }

  public put(oid: string, survyeQuest: SurveyCat): Observable<SurveyCat> {
    return this.http.put(`${environment.api}/surveyCats/${oid}`, {
      SurveyCat: survyeQuest
    })
      .pipe(
        take(1), map(response => response["SurveyCat"])
      );
  }

  public remove(oid: string): Observable<SurveyCat> {
    return this.http.delete(`${environment.api}/surveyCats/${oid}`).pipe(
      take(1),
      map(response => response["SurveyCat"])
    );
  }


}
