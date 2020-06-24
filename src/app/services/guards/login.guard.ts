import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../Usuarios/usuario.service';


@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private serviceUsuario: UsuarioService
    ) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.serviceUsuario.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/home']);
    }
  }

}
