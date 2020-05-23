import { Injectable } from '@angular/core';
import { IUsuario } from './usuario.interface';
import { getHeaders, getParams, getHeadersOauth } from '../misc/Headers';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) { }

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
   * Crea una entidad de tipo IUsuarios
   * @IUsuarios Recibe un objeto del tipo IUsuarios como parametro
   * @returns Item de dato de Tipo IUsuarios
   */
  loginOauth(usuario: IUsuario): Observable<any> {

    const params = getParams(usuario.email, usuario.password);

    return this.httpClient.post(this.mUrlOauth, params, {
      headers: getHeadersOauth(this.credenciales)
    });
  }
}
