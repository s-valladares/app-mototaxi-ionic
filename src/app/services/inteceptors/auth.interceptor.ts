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
import { UsuarioService } from '../Usuarios/usuario.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    public toastController: ToastController,
    private router: Router,
    public serviceUsuario: UsuarioService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    return next.handle(req).pipe(
      catchError(e => {

        if (e.status === 401) {
          this.serviceUsuario.logOut();
          this.router.navigate(['/login']);
        }

        if (e.status === 403) {
          alert('Acceso denegado');
          this.serviceUsuario.logOut();
          this.router.navigate(['/login']);
        }

        return throwError(e);
      })

    );

  }
}
