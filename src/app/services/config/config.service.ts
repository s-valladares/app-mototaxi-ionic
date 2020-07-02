import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IConfigStatic } from './config.interface';
import { environment } from '../../../environments/environment';

@Injectable()
export class ConfigService {
  public urlIp  = 'http://192.168.59.1:5000/mototaxi/api/';

  public urlLocal = 'http://localhost:5000/mototaxi/api/';
  public urlAuthLocal = 'http://localhost:5000/oauth/token';
  public urlWebSocket = 'http://localhost:5000';
  public credenciales = btoa('ionicapp' + ':' + 'api.mototaxi.6781');


/*
  public mCfgStatic: IConfigStatic = null;
  lFileConfig: any;
  constructor(private httpClient: HttpClient) { }

  loadAppConfigStatic() {

    if (environment.production) {
      this.lFileConfig = 'assets/config.json';
    } else {
      this.lFileConfig = 'assets/config.dev.json';
    }
    return this.httpClient
      .get(this.lFileConfig)
      .pipe(
        map((response: IConfigStatic) => {
          return response;
        })
      )
      .toPromise()
      .then(data => {
        this.mCfgStatic = data;
      });
  }
*/
}
