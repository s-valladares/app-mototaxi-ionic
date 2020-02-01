import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  @Input() tipoModal: string;

  checked: boolean;
  mensaje: string;
  notificaciones: boolean;
  foto: boolean;

  constructor(
    private modal: ModalController
  ) {
    this.notificaciones = false;
    this.foto = false;

    this.checked = true;
    this.mensaje = 'Recibir';
  }

  ngOnInit() {
    if (this.tipoModal === 'notificaciones') {
      this.notificaciones = true;
    } else {
      this.foto = true;
    }
  }

  cerarModal() {
    this.modal.dismiss();
  }

  cambiar() {

    if (this.checked === true) {
      this.checked = false;
      this.mensaje = 'No recibir';
    } else {
      this.checked = true;
      this.mensaje = 'Recibir';
    }
  }

  abrirGaleria() {

  }

  abrirCamara() {

  }

  eliminarFoto() {
    
  }

}
