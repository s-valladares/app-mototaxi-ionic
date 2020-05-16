import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PilotosService {

  private mUrl = 'http://localhost:5000/mototaxi/api/pilotos';
  private mService = 'egresos';

  constructor(
    private httpClient: HttpClient
  ) { }

  // Obtener listado de egresos
  getAll() {
    return this.httpClient.get(this.mUrl).pipe(
      map((data: any) => {
        return data;
      })).toPromise();
  }
}
