import { Injectable } from '@angular/core';
import { IUsuario } from './usuario.interface';
import { getHeaders } from '../misc/Headers';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  /** Nombre de recurso ha obtener en la API */
  private mService = 'usuarios';
  /** Url obtenida del servicio de configuracion */
  private mUrl = this.configService.urlLocal;

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
}
