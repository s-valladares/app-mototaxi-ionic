import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
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

    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });

      return next.handle(authReq);
    }

    return next.handle(req);

  }
}
