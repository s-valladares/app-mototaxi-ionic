import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  @Input() tipoModal: string;

  checkedNotificaciones: boolean;
  checkedPiloto: boolean;
  config: boolean;
  foto: boolean;

  constructor(
    private modal: ModalController,
    public alertController: AlertController,
  ) {
    this.config = false;
    this.foto = false;

    this.checkedNotificaciones = true;
    this.checkedPiloto = false;
  }

  ngOnInit() {
    if (this.tipoModal === 'config') {
      this.config = true;
    } else {
      this.foto = true;
    }
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
    if (!this.checkedPiloto) {
      this.activarPiloto('iniciar');
    } else {
      this.activarPiloto('cancelar');
    }

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
