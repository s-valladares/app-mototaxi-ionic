import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { PilotosService, UsuarioService } from 'src/app/services/services.index';
import { EncryptAndStorage } from 'src/app/services/misc/storage';
import { constantesId } from 'src/app/services/misc/enums';
import { IPilotos, Pilotos, IUbicaciones, Ubicaciones } from 'src/app/services/interfaces.index';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {

  @Input() tipoModal: string;

  piloto: IPilotos;
  isPiloto: boolean;

  checkedNotificaciones: boolean;
  config: boolean;
  foto: boolean;

  private ubicacion: IUbicaciones;

  private client: Client;

  constructor(
    private modal: ModalController,
    private alertController: AlertController,
    private servicePiloto: PilotosService,
    private serviceUsuario: UsuarioService
  ) {
    this.config = false;
    this.foto = false;

    this.checkedNotificaciones = true;
    this.piloto = Pilotos.empty();
    this.ubicacion = Ubicaciones.empty();
  }

  ngOnInit() {
    this.configWS();
    this.configTipoModal();
    this.isPiloto = this.serviceUsuario.isPiloto();
  }

  ngOnDestroy() {
    this.deactiveClientSocket();
  }

  configTipoModal() {
    if (this.tipoModal === 'config') {
      this.config = true;
    } else {
      this.foto = true;
    }
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
      this.activarPiloto('desactivar');
    } else {
      this.activarPiloto('activar');
    }
  }

  abrirGaleria() {

  }

  abrirCamara() {

  }

  eliminarFoto() {

  }

  configWS() {
    this.client = new Client();
    this.client.webSocketFactory = () => {
      return new SockJS('http://localhost:5000/mototaxis');
    };

    this.client.onDisconnect = (frame) => {
      console.log('Desconectado');
    };

    this.client.activate();

  }

  enviarMensajeWS() {

    this.ubicacion.latitud = '-3';
    this.ubicacion.longitud = '-4';
    this.ubicacion.usuario.id = '2';
    // console.log(this.ubicaciones);

    const piloto: IPilotos = Pilotos.empty();
    piloto.usuario.id = '3';
    piloto.usuario.persona.nombres = 'PruebaPilotoNombre';
    piloto.usuario.persona.apellidos = 'PruebaPilotoApellidos';

    this.client.publish({ destination: '/api/piloto-on', body: JSON.stringify(this.ubicacion) });
    this.client.publish({ destination: '/api/piloto-conectado', body: JSON.stringify(piloto) });
  }

  activeClientSocket() {
    this.client.activate();
  }

  deactiveClientSocket() {
    this.client.deactivate();
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
            console.log(blah);
          }
        }, {
          text: 'Seguro',
          handler: () => {
            // Activar piloto
            this.enviarMensajeWS();
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
