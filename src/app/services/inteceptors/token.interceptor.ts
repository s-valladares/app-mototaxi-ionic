import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  Router
} from '@angular/router';
import { ToastController } from '@ionic/angular';
import { constantesDatosToken } from '../misc/enums';
import { EncryptAndStorage } from '../misc/storage';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    public toastController: ToastController
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = EncryptAndStorage.getEncryptStorage(constantesDatosToken.token);
    console.log('token: ');
    console.log(token);

    if (token !== null) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });

      return next.handle(authReq);
    }

    return next.handle(req);

  }
}
