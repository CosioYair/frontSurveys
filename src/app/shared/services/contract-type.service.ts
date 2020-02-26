import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContractType } from '../model/contract-type';
import { environment } from 'src/environments/environment';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContractTypeService {

  constructor(public http: HttpClient) { }

  public index(): Observable<ContractType[]> {
    return this.http.get(`${environment.api}/contractTypes`).pipe(
      take(1),
      map(response => response['ContractTypes'])
    );
  }
}
