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

    this.client = new Client();
    this.client.webSocketFactory = () => {
      return new SockJS('http://localhost:5000/mototaxis');
    };

    this.client.onConnect = (frame) => {
      console.log('Conectado: ' + this.client.connected);

      this.client.subscribe('/ubicaciones/piloto-on', e => {
        const data = JSON.parse(e.body);
        this.ubicacion = data.body.RES;
        console.log(this.ubicacion);
      });

      this.client.subscribe('/ubicaciones/piloto-off', e => {
        console.log(JSON.parse(e.body));
      });

      this.client.subscribe('/ubicaciones/piloto-conectado', e => {
        // console.log(e.body);
        this.pilotos.push(JSON.parse(e.body));
      });



    };

    this.client.onDisconnect = (frame) => {
      console.log('Desconectado');
    };

    this.conectarWSocket();

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

  conectarWSocket() {
    this.client.activate();
  }

  desconectarWSocket() {
    this.client.deactivate();
  }


  ngOnDestroy() {
    this.desconectarWSocket();
  }

  enviarMensaje() {

    this.ubicaciones.latitud = '-3';
    this.ubicaciones.longitud = '-4';
    this.ubicaciones.usuario.id = '1';
    // console.log(this.ubicaciones);

    const piloto: IPilotos = Pilotos.empty();
    piloto.usuario.id = '3';
    piloto.usuario.persona.nombres = 'PruebaPilotoNombre';
    piloto.usuario.persona.apellidos = 'PruebaPilotoApellidos';

    this.client.publish({ destination: '/api/piloto-on', body: JSON.stringify(this.ubicaciones) });
    this.client.publish({ destination: '/api/piloto-conectado', body: JSON.stringify(piloto) });
  }

  salir() {

    this.ubicaciones.latitud = '-3';
    this.ubicaciones.longitud = '-4';
    this.ubicaciones.usuario.id = '1';
    this.client.publish({ destination: '/api/piloto-off', body: JSON.stringify(this.ubicacion) });
  }

}




