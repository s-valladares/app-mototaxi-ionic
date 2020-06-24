import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UsuarioService } from '../Usuarios/usuario.service';

import Swal from 'sweetalert2';

@Injectable()
export class UrlGuard implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthService,
    private serviceUsuario: UsuarioService
    ) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.serviceUsuario.isLoggedIn()) {
      return true;
    } else {
      this.alertError('Debes iniciar sesión', 'Serás enviado al inicio');
      this.router.navigate(['/login']);
    }
  }

  alertError(mensaje, foot) {
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: mensaje,
      footer: foot
    });
  }
}
