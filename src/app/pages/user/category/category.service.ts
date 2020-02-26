import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from './category';
import { environment } from 'src/environments/environment';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(public http: HttpClient) { }

  public create(category: Category): Observable<Category> {
    return this.http.post(`${environment.api}/categories`, {
      Category: category
    }).pipe(
      take(1),
      map(response => response['Category'])
    );
  }

  public show(oid: string): Observable<Category> {
    return this.http.get(`${environment.api}/categories/${oid}`).pipe(
      take(1),
      map(response => response['Category'])
    );
  }

  public update(oid: string, category: Category): Observable<Category> {
    return this.http.put(`${environment.api}/categories/${oid}`, {
      Category: category
    }).pipe(
      take(1),
      map(response => response['Category'])
    );
  }

  public delete(oid: string): Observable<Category> {
    return this.http.delete(`${environment.api}/categories/${oid}`).pipe(
      take(1),
      map(response => response['Category'])
    );
  }
}
