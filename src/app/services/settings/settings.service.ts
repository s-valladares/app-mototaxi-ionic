import { Injectable } from '@angular/core';
import { EncryptAndStorage } from '../misc/storage';
import { constantesId, constantesDatosToken } from '../misc/enums';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(
  ) { }

  ecryptAndStorageToken(pToken) {
    EncryptAndStorage.setEncryptStorage(constantesDatosToken.email, pToken.email);
    EncryptAndStorage.setEncryptStorage(constantesDatosToken.exp, pToken.exp);
    EncryptAndStorage.setEncryptStorage(constantesId.usuarioId, pToken.id_usuario);
    EncryptAndStorage.setEncryptStorage(constantesDatosToken.token_decode, pToken);

    if (pToken.piloto_id > 0) {
      EncryptAndStorage.setEncryptStorage(constantesId.pilotoId, pToken.piloto_id);
    }

  }
}

