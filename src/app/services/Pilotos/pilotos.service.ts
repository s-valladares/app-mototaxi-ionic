import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getHeaders } from '../misc/Headers';
import { map } from 'rxjs/operators';
import { IPilotos } from './pilotos.interface';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class PilotosService {

  /** Nombre de recurso ha obtener en la API */
  private mService = 'pilotos';
  /** Url obtenida del servicio de configuracion */
  private mUrl = this.configService.urlLocal;

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) { }

  // Obtener listado de egresos
  getAll() {
    return this.httpClient.get(this.mUrl).pipe(
      map((data: any) => {
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
}
