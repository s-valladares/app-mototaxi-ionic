import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getHeaders } from '../misc/Headers';
import { map } from 'rxjs/operators';
import { IPilotos, IPilotosRs } from './pilotos.interface';
import { ConfigService } from '../config/config.service';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class PilotosService {

 /** Nombre de recurso ha obtener en la API */
 private mService = 'pilotos';
 /** Url obtenida del servicio de configuracion */
 private mUrl = this.configService.urlLocal;

 private client: Client;

 constructor(
   private httpClient: HttpClient,
   private configService: ConfigService
 ) { }

   /***
  * Devuelve listado de personas de tipo IPersonas
  * @returns listado de dato de Tipo IPersonas
  */
 getAllPilotos() {
  return this.httpClient.get(this.mUrl + this.mService, {
    headers: getHeaders()
  }).pipe(
    map((data: IPilotosRs) => {
      return data;
    })).toPromise();
}

  /**
   * Crea una entidad de tipo IPilotos
   * @IPilotos Recibe un objeto del tipo IPilotos como parametro
   * @returns Item de dato de Tipo IPilotos
   */
  newPiloto(piloto: IPilotos) {
    const JsonUsuario = JSON.stringify(piloto);
    return this.httpClient.post(this.mUrl + this.mService, JsonUsuario, {
      headers: getHeaders()
    }).pipe(
      map((data: any) => {
        return data.RES;
      })).toPromise();
  }

  /**
   * Obtiene un IPiloto a partir de un IUsuario.id
   * @Id Recibe un id de IUsuario como parametro
   * @returns Item de dato de Tipo IPilotos
   */
  getPilotoByIdUser(idUsuario) {
    return this.httpClient.get(this.mUrl + this.mService + '/usuario/' + idUsuario, {
      headers: getHeaders()
    }).pipe(
      map((data: any) => {
        return data;
      })).toPromise();
  }

}
