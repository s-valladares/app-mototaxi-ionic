import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { PilotosService } from 'src/app/services/services.index';
import { EncryptAndStorage } from 'src/app/services/misc/storage';
import { constantesId } from 'src/app/services/misc/enums';
import { IPilotos, Pilotos } from 'src/app/services/interfaces.index';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  @Input() tipoModal: string;

  piloto: IPilotos;
  modoPiloto: boolean;
  pilotoId;

  checkedNotificaciones: boolean;
  checkedPiloto: boolean;
  config: boolean;
  foto: boolean;

  constructor(
    private modal: ModalController,
    private alertController: AlertController,
    public servicePiloto: PilotosService,
  ) {
    this.config = false;
    this.foto = false;

    this.checkedNotificaciones = true;
    this.checkedPiloto = false;
    this.piloto = Pilotos.empty();
  }

  ngOnInit() {
    if (this.tipoModal === 'config') {
      this.config = true;
    } else {
      this.foto = true;
    }

    this.pilotoId =  EncryptAndStorage.getEncryptStorage(constantesId.usuarioId);
    this.comprobarPiloto();
  }

  comprobarPiloto() {
    this.servicePiloto.getPilotoByIdUser(this.pilotoId)
      .then(data => {
        this.piloto = data;
        console.log(this.piloto);
        this.modoPiloto = true;
      })
      .catch(error => {
        console.log(error);

      });
  }

  cerarModal() {
    this.modal.dismiss();
  }

  cambiar() {

    if (this.checkedNotificaciones === true) {
      this.checkedNotificaciones = false;
    } else {
      this.checkedNotificaciones = true;
    }
  }

  cambiarModoPiloto() {
   

  }

  abrirGaleria() {

  }

  abrirCamara() {

  }

  eliminarFoto() {

  }

  async activarPiloto(accion) {
    const alert = await this.alertController.create({
      header: '¿Iniciar piloto?',
      message: '<strong>¿Está seguro de ' + accion + ' modo piloto?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.checkedPiloto = false;
          }
        }, {
          text: 'Seguro',
          handler: () => {
            this.checkedPiloto = true;
          }
        }
      ]
    });

    await alert.present();
  }

}
