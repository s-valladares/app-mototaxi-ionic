import { Injectable } from '@angular/core';
import { IUsuario } from './usuario.interface';
import { getHeaders, getParams, getHeadersOauth } from '../misc/Headers';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LStorage, EncryptAndStorage } from '../misc/storage';
import { constantesDatosToken } from '../misc/enums';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  /** Nombre de recurso ha obtener en la API */
  private mService = 'usuarios';
  /** Url obtenida del servicio de configuracion */
  private mUrl = this.configService.urlLocal;
  private mUrlOauth = this.configService.urlAuthLocal;
  private credenciales = this.configService.credenciales;

  isLoggedIn: boolean;
  token: any;

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {
    this.token = EncryptAndStorage.getEncryptStorage(constantesDatosToken.token);
    this.isLoggedIn = this.token;
   }

  /**
   * Crea una entidad de tipo IUsuarios
   * @IUsuarios Recibe un objeto del tipo IUsuarios como parametro
   * @returns Item de dato de Tipo IUsuarios
   */
  newUsuario(usuario: IUsuario) {
    const JsonUsuario = JSON.stringify(usuario);
    return this.httpClient.post(this.mUrl + this.mService, JsonUsuario, {
      headers: getHeaders()
    }).pipe(
      map((data: any) => {
        return data.RES;
      })).toPromise();
  }

  /**
   * Hace un post al servidor para iniciar sesión
   * @IUsuarios Recibe un objeto del tipo IUsuarios como parametro
   * @returns Item de dato de Tipo IUsuarios
   */
  loginOauth(usuario: IUsuario): Observable<any> {

    const params = getParams(usuario.email, usuario.password);

    return this.httpClient.post(this.mUrlOauth, params, {
      headers: getHeadersOauth(this.credenciales)
    });
  }

  logOut() {
    LStorage.clear();
    this.isLoggedIn = false;
  }
}
