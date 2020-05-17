import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { SettingsComponent } from '../settings/settings/settings.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  pages = [
    {
      title: 'Mi Perfil',
      url: '/home/perfil',
      icon: 'person',
      mostrar: 'ok'
    },
    {
      title: 'Logout',
      icon: 'ios-exit',
      mostrar: 'ok'
    },
    {
      title: 'Settings',
      icon: 'settings',
      mostrar: 'ok'
    }

  ];
  constructor(
    public modalController: ModalController,
    public alertController: AlertController,
    public router: Router
  ) { }

  ngOnInit() {
  }

  accion(p) {
    if (p.title === 'Settings') {
      this.presentModal();
    }
    if (p.title === 'Logout') {
      this.logout();
    }
  }

  async logout() {
    const alert = await this.alertController.create({
      header: '¿Cerrar sesión?',
      message: '<strong>¿Está seguro de cerrar sesión?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Salir',
          handler: () => {
            // this.authService.logout();
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SettingsComponent,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        tipoModal: 'config'
      }
    });
    return await modal.present();
  }

}
