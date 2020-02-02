import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  @Input() idUsuario: string;
  urlAvatar: string;
  mensajes: any[];
  mensaje: string;

  constructor(
    public modalController: ModalController
  ) {
    this.mensajes = [];
    this.mensaje = '';
  }

  ngOnInit() {
    this.urlAvatar = '../../../../assets/icon/usuario.svg';
  }

  cerrarChat() {
    this.modalController.dismiss();
  }

  enviarMensaje() {
    this.mensajes.push({
      usuario: 'usuario',
      mensaje: this.mensaje
    });
    this.mensaje = '';
    console.log(this.mensajes);
  }

}
