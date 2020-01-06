import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  GoogleMapsAnimation
} from '@ionic-native/google-maps';
import { IUbicacion, Ubicacion } from 'src/app/services/ubicacion/ubicacion.interface';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { delay } from 'q';
import { debounce, debounceTime } from 'rxjs/operators';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }])
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {


  public ubicaciones: IUbicacion[];
  public a = 20;


  constructor(
    private geolocation: Geolocation,
    private firestoreService: FirestoreService
  ) {


    this.ubicaciones = [];
    this.getAll();

  }

  getAll() {
    console.log('ddddd')

    this.firestoreService.getAll()
      .subscribe((ubicaciones) => {

        this.ubicaciones = [];

        ubicaciones
          .forEach((datos: any) => {

            this.ubicaciones.push(datos.payload.doc.data());

          });

        console.log(this.ubicaciones)
      }, error => alert(error));

  }
}
