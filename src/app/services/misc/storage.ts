import { enSesionStg } from './enums';
import { Crypt } from './Crypt';
import { environment } from 'src/environments/environment';

// SESION STORAGE
export class SStorage {
  static clear() {
    sessionStorage.clear();
  }

  static set(key: enSesionStg, value: any) {
    if (environment.encrypt) {
      this.setCrypt(key, value);
    } else {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }

  static get(key: enSesionStg) {
    if (environment.encrypt) {
      return this.getCrypt(key);
    } else {
      if (sessionStorage.getItem(key)) {
        return JSON.parse(sessionStorage.getItem(key));
      } else {
        return '';
      }
    }
  }

  static setCrypt(key: any, value: any) {
    const lKey = Crypt.MD5(key);
    const lValue = Crypt.encrypt(JSON.stringify(value), lKey);
    sessionStorage.setItem(lKey, lValue);
  }

  static getCrypt(key: any) {
    const lKey = Crypt.MD5(key);
    if (sessionStorage.getItem(lKey)) {
      const lValue = sessionStorage.getItem(lKey);
      return JSON.parse(Crypt.decrypt(lValue, lKey));
    } else {
      return '';
    }
  }
}

// LOCALE STORAGE
export class LStorage {
  static clear() {
    localStorage.clear();
  }

  static set(key: any, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get(key: any) {
    if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key));
    } else {
      return '';
    }
  }
}

// Encriptar y guardar en localStorage
export class EncryptAndStorage {
  static clear() {
    sessionStorage.clear();
  }

  static set(key: enSesionStg, value: any) {
    if (environment.encrypt) {
      this.setEncryptStorage(key, value);
    } else {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }

  static get(key: enSesionStg) {
    if (environment.encrypt) {
      return this.getEncryptStorage(key);
    } else {
      if (sessionStorage.getItem(key)) {
        return JSON.parse(sessionStorage.getItem(key));
      } else {
        return '';
      }
    }
  }

  static setEncryptStorage(key: any, value: any) {
    const lKey = Crypt.MD5(key);
    const lValue = Crypt.encrypt(JSON.stringify(value), lKey);
    localStorage.setItem(lKey, lValue);
  }

  static getEncryptStorage(key: any) {
    const lKey = Crypt.MD5(key);
    if (localStorage.getItem(lKey)) {
      const lValue = localStorage.getItem(lKey);
      return JSON.parse(Crypt.decrypt(lValue, lKey));
    } else {
      return '';
    }
  }
}
