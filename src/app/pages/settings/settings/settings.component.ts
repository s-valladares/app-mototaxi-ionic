import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { PilotosService, UsuarioService } from 'src/app/services/services.index';
import { EncryptAndStorage } from 'src/app/services/misc/storage';
import { constantesId } from 'src/app/services/misc/enums';
import { IPilotos, Pilotos, IUbicaciones, Ubicaciones } from 'src/app/services/interfaces.index';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {

  @Input() tipoModal: string;

  piloto: IPilotos;
  isPiloto: boolean;
  usuarioId;

  checkedNotificaciones: boolean;
  config: boolean;
  foto: boolean;

  private ubicacion: IUbicaciones;
  private client: Client;

  loading: any;

  private mUrl = this.configService.urlWebSocket;

  constructor(
    private modal: ModalController,
    private alertController: AlertController,
    private servicePiloto: PilotosService,
    private serviceUsuario: UsuarioService,
    private loadingController: LoadingController,
    private configService: ConfigService
  ) {
    this.config = false;
    this.foto = false;

    this.checkedNotificaciones = true;
    this.piloto = Pilotos.empty();
    this.ubicacion = Ubicaciones.empty();
  }

  ngOnInit() {
    this.configTipoModal();
    this.isPiloto = this.serviceUsuario.isPiloto();
    if (this.isPiloto) { this.configWS(); }
    this.usuarioId = EncryptAndStorage.getEncryptStorage(constantesId.usuarioId);
    this.getPilotoByUserId();
  }

  ngOnDestroy() {
    if (this.isPiloto) { this.deactiveClientSocket(); }
  }

  configTipoModal() {
    if (this.tipoModal === 'config') {
      this.config = true;
    } else {
      this.foto = true;
    }
  }

  getPilotoByUserId() {
    this.servicePiloto.getPilotoByIdUser(this.usuarioId)
      .then(data => {
        this.piloto = data;
      })
      .catch(error => {
        console.log(error);
      });
  }


  cambiar() {

    if (this.checkedNotificaciones === true) {
      this.checkedNotificaciones = false;
    } else {
      this.checkedNotificaciones = true;
    }
  }

  cambiarModoPiloto() {
    if (this.piloto.activo) {
      this.toggleModoPiloto('desactivar');
    } else {
      this.toggleModoPiloto('activar');
    }
  }

  abrirGaleria() {

  }

  abrirCamara() {

  }

  eliminarFoto() {

  }

  configWS() {
    this.presentLoading();
    this.client = new Client();
    this.client.webSocketFactory = () => {
      return new SockJS(this.mUrl + '/mototaxis');
    };

    this.client.onConnect = (frame) => {
      if (this.client.connected) {
        this.dismissLoading();
        console.log('Conectado: ' + this.client.connected);

        this.client.subscribe('/ubicaciones/piloto-on', e => {
          const data = JSON.parse(e.body);
          this.ubicacion = data.body.RES;
          EncryptAndStorage.setEncryptStorage(constantesId.ubicacionPilotoId, this.ubicacion.id);
        });
      }

    };

    this.client.onDisconnect = (frame) => {
      console.log('Desconectado');
    };

    this.client.activate();

  }

  publishPilotoOn() {

    this.ubicacion.latitud = '-322444';
    this.ubicacion.longitud = '-422444';

    this.piloto.lat = this.ubicacion.latitud;
    this.piloto.lng = this.ubicacion.longitud;

    this.ubicacion.usuario.id = this.usuarioId;

    this.client.publish({ destination: '/api/piloto-on', body: JSON.stringify(this.ubicacion) });
    this.client.publish({ destination: '/api/piloto-conectado', body: JSON.stringify(this.piloto) });
  }

  publishPilotoOff() {
    this.ubicacion.id = EncryptAndStorage.getEncryptStorage(constantesId.ubicacionPilotoId);
    this.ubicacion.usuario.id = EncryptAndStorage.getEncryptStorage(constantesId.usuarioId);
    this.client.publish({ destination: '/api/piloto-off', body: JSON.stringify(this.ubicacion) });
  }



  activeClientSocket() {
    this.client.activate();
  }

  deactiveClientSocket() {
    this.client.deactivate();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      spinner: 'lines-small',
      cssClass: 'spinner-loading',
      message: 'Cargando configuraciones...'
    });
    await this.loading.present();
  }

  private dismissLoading() {
    this.loading.dismiss();
  }



  async toggleModoPiloto(accion) {
    const alert = await this.alertController.create({
      header: '¿Iniciar piloto?',
      message: '<strong>¿Está seguro de ' + accion + ' modo piloto?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log(blah);
          }
        }, {
          text: 'Seguro',
          handler: () => {
            if (accion === 'activar') {
              console.log('activar');
              this.publishPilotoOn();
            } else {
              console.log('desactivar');
              this.publishPilotoOff();
              this.piloto.activo = false;
            }

          }
        }
      ]
    });

    await alert.present();
  }

  cerarModal() {
    this.modal.dismiss();
  }

}
