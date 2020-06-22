import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { IUbicacion, Ubicacion } from 'src/app/services/ubicacion/ubicacion.interface';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { PilotosService } from 'src/app/services/Pilotos/pilotos.service';
import { IUbicaciones, Ubicaciones } from 'src/app/services/Ubicaciones/ubicaciones.interface';
import { IUsuario, Usuario } from 'src/app/services/Usuarios/usuario.interface';
import { IPersonas, Personas } from 'src/app/services/Personas/personas.interface';
import { IPilotos, Pilotos } from 'src/app/services/Pilotos/pilotos.interface';
import { EncryptAndStorage } from 'src/app/services/misc/storage';
import { constantesId } from 'src/app/services/misc/enums';

@Component({
  selector: 'app-activos',
  templateUrl: './activos.page.html',
  styleUrls: ['./activos.page.scss'],
})
export class ActivosPage implements OnInit, OnDestroy {

  private ubicaciones: IUbicaciones;
  private ubicacion: IUbicaciones;
  private usuario: IUsuario;
  private persona: IPersonas;
  pilotos: any[];
  private client: Client;

  urlAvatar: string;

  constructor(
    private firestoreService: FirestoreService,
    private service: PilotosService
  ) {
    this.ubicaciones = Ubicaciones.empty();
    this.usuario = Usuario.empty();
    this.persona = Personas.empty();
    this.ubicacion = Ubicaciones.empty();
  }

  ngOnInit() {

    this.urlAvatar = '../../../../assets/icon/usuario.svg';
    this.getAllPilotos();
    this.configWS();
    this.activateWS();
    // this.getAllActivos();
  }

  segmentChanged(ev: any) {
    console.log('Segmento activo: ', ev.detail.value);
  }

  /*

    getAllActivos() {
      this.firestoreService.getAllPilotos()
        .subscribe((ubicaciones) => {

          this.ubicaciones = [];

          ubicaciones
            .forEach((datos: any) => {

              this.ubicaciones.push(datos.payload.doc.data());

              try {

           } catch (error) {
                alert(error);
              }

            });
          console.log(this.ubicaciones);

        }, error => alert(error));

    }
  */

  getAllPilotos() {
    this.service.getAllPilotos()
      .then(data => {
        this.pilotos = data.rows;
      })
      .catch(error => {
        console.log(error);

      });
  }

  activateWS() {
    this.client.activate();
  }

  deActivateWS() {
    this.client.deactivate();
  }


  ngOnDestroy() {
    this.deActivateWS();
  }

  configWS() {
    this.client = new Client();
    this.client.webSocketFactory = () => {
      return new SockJS('http://localhost:5000/mototaxis');
    };

    this.client.onConnect = (frame) => {
      console.log('Conectado: ' + this.client.connected);

      this.client.subscribe('/ubicaciones/piloto-on', e => {
        const data = JSON.parse(e.body);
        this.ubicacion = data.body.RES;
        EncryptAndStorage.setEncryptStorage(constantesId.ubicacionPilotoId, this.ubicacion.id);
      });

      this.client.subscribe('/ubicaciones/piloto-off', e => {
        const ubicacion = JSON.parse(e.body);
        console.log(ubicacion.body.RES);
        const id = ubicacion.body.RES.usuario.id;
        this.quitarInactivo(id);
      });

      this.client.subscribe('/ubicaciones/piloto-conectado', e => {
        this.pilotos.push(JSON.parse(e.body));
      });

    };

    this.client.onDisconnect = (frame) => {
      console.log('Desconectado');
    };
  }

  quitarInactivo(id) {
    console.log(id);
    this.pilotos = this.pilotos
      .filter(a =>
        (a.usuario.id !== id)
      );
  }

}




