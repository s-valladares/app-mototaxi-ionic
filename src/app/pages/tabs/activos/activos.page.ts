import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { IUbicacion } from 'src/app/services/ubicacion/ubicacion.interface';

@Component({
  selector: 'app-activos',
  templateUrl: './activos.page.html',
  styleUrls: ['./activos.page.scss'],
})
export class ActivosPage implements OnInit {

  public ubicaciones: IUbicacion[];

  constructor(
    private firestoreService: FirestoreService,
  ) {

  }

  ngOnInit() {
    this.getAllActivos();
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

}
