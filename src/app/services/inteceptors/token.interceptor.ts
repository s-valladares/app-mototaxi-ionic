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
import { ConfigService } from '../config/config.service';
import { getHeadersOauth } from '../misc/Headers';

@Injectable()
export class TokenInterceptor  {

  private credenciales = this.configService.credenciales;

  constructor(
    public toastController: ToastController,
    private configService: ConfigService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = EncryptAndStorage.getEncryptStorage(constantesDatosToken.token);
    console.log('token: ');
    console.log(token);

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
    }

    request = request.clone({
      headers: getHeadersOauth(this.credenciales)
    });

    return next.handle(request);

  }
}
