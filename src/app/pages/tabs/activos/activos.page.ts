import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { IUbicacion } from 'src/app/services/ubicacion/ubicacion.interface';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { PilotosService } from 'src/app/services/Pilotos/pilotos.service';

@Component({
  selector: 'app-activos',
  templateUrl: './activos.page.html',
  styleUrls: ['./activos.page.scss'],
})
export class ActivosPage implements OnInit {

  private ubicaciones: IUbicacion[];
  private client: Client;

  constructor(
    private firestoreService: FirestoreService,
    private service: PilotosService
  ) {

  }

  ngOnInit() {

    this.getAllPilotos();

    this.client = new Client();
    this.client.webSocketFactory = () => {
      return new SockJS('http://localhost:5000/mototaxis');
    };

    this.client.onConnect = (frame) => {
      console.log('Conectado: ' + this.client.connected);
    };

    this.client.activate();


    // this.getAllActivos();
  }

  segmentChanged(ev: any) {
    console.log('Segmento activo: ', ev.detail.value);
  }

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

  getAllPilotos() {
    this.service.getAll()
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);

      });
  }
}


