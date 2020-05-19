import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { getHeaders } from '../misc/Headers';
import { map } from 'rxjs/operators';
import { IPersonasRs, IPersonas } from './personas.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  /** Nombre de recurso ha obtener en la API */
  private mService = 'personas';
  /** Url obtenida del servicio de configuracion */
  private mUrl = this.configService.urlLocal;

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) { }

  /***
  * Devuelve listado de personas de tipo IPersonas
  * @returns listado de dato de Tipo IPersonas
  */
  getAllPersonas() {
    return this.httpClient.get(this.mUrl + this.mService, {
      headers: getHeaders()
    }).pipe(
      map((data: IPersonasRs) => {
        return data;
      })).toPromise();
  }

  /**
   * Crea una entidad de tipo IPersonas
   * @IPersonas Recibe un objeto del tipo IPersonas como parametro
   * @returns Item de dato de Tipo IPersonas
   */
  newPersona(persona: IPersonas) {
    const JsonPersona = JSON.stringify(persona);
    return this.httpClient.post(this.mUrl + this.mService, JsonPersona, {
      headers: getHeaders()
    }).pipe(
      map((data: any) => {
        return data;
      })).toPromise();
  }
}
