import { Injectable } from '@angular/core';
import { DecodedJwt } from '../model/decoded-jwt';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtHelperService {

  constructor() { }

  public isTokenExpired(token: string): boolean {
    if (token) {
      const decodedJwt: DecodedJwt = this.decodeJwt(token);
      const today = new Date();
      const expDate = decodedJwt.exp ? new Date(decodedJwt.exp) : new Date();
      return today > expDate;
    }
    return true;
  }

  public decodeJwt(jwt: string): DecodedJwt {
    try {
      const jwtObject = jwt_decode(jwt);
      const decodeJwt = {
        ...jwtObject,
        exp: new Date(jwtObject.exp * 1000),
        iat: new Date(jwtObject.iat * 1000),
      };
      return decodeJwt;
    } catch (Error) {
      return {} as DecodedJwt;
    }
  }

  public getDecodedJwt(): DecodedJwt {
    const jwt = localStorage.getItem('jwt');
    return this.decodeJwt(jwt);
  }
}
