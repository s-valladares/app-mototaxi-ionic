import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SettingsComponent } from '../../settings/settings/settings.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }

  cambiarFoto() {
    this.presentModal();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SettingsComponent,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        tipoModal: 'foto'
      }
    });
    return await modal.present();
  }

}
