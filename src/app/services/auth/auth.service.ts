import { ConfigService } from '../config/config.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IAuth } from 'src/app/services/interfaces.index';
import { getHeaders } from '../misc/Headers';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string;
  isLoggedIn: boolean; 
  token: any;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router
  ) {
    // this.token = localStorage.getItem('fly');
    this.apiUrl = this.configService.urlLocal;
    this.isLoggedIn = this.token;
  }

  Login(usuario: IAuth) {
    const auth = JSON.stringify(usuario);
    return this.http.post(this.apiUrl + 'authenticate', auth, {
      headers: getHeaders()
    }).pipe(map((data: any) => {
      return data;
    })).toPromise();
  }

  Blog() {
    return this.http.get(this.apiUrl +  'blog', {
      headers: getHeaders()
    }).pipe(
      map((data: any) => {
        return data;
      })).toPromise();
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.setItem('fly', '');
    this.router.navigateByUrl('/login');
  }
}
