import { Injectable } from '@angular/core';
import decode from 'jwt-decode';
import { SStorage } from '../misc/storage';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private user: any;
  constructor() { }

  SetToke(pToken: string) {
    if (pToken) {
      this.user = decode(pToken);
    }
    if (this.user) {
      SStorage.setCrypt('username', this.user.username);
      SStorage.setCrypt('exp', this.user.exp);
      SStorage.setCrypt('iat', this.user.iat);
    }

  }
}

