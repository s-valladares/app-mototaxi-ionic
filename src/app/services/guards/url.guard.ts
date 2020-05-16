import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UrlGuard implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthService
    ) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
