import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChatComponent } from './chat/chat/chat.component';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.page.html'
})
export class MensajesPage implements OnInit {

  urlAvatar: string;
  idUsuario: string;


  constructor(
    public modalController: ModalController
  ) {
    this.idUsuario = '';
   }

  ngOnInit() {
    this.urlAvatar = '../../../../assets/icon/usuario.svg';
  }

  abrirChat(id: string) {
    this.idUsuario = id;
    this.presentModal();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ChatComponent,
      componentProps: {
        idUsuario: this.idUsuario
      }
    });
    return await modal.present();
  }

}
