import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private _loading: boolean = false;

  constructor(private ngxService: NgxUiLoaderService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = localStorage.getItem('jwt');
    const authorization = req.headers.get('Authorization');
    const clonedRequest = jwt && !authorization ? req.clone({ headers: req.headers.set('Authorization', `Bearer ${jwt}`) }) : req;
    if (!this._loading) {
      this.ngxService.start();
      this._loading = true;
    }
    return next.handle(clonedRequest).pipe(
      finalize(() => {
        if (this._loading) {
          this.ngxService.stop();
          this._loading = false;
        }
      })
    );

  }

}
