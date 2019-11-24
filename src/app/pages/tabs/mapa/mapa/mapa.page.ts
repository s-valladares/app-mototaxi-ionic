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
import { IUbicacion } from 'src/app/services/ubicacion/ubicacion.interface';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { delay } from 'q';
import { debounce, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-mapa',
  templateUrl: 'mapa.page.html',
  styleUrls: ['mapa.page.scss']
})
export class MapaPage implements OnInit {

  public creado: boolean;
  public parar: boolean;
  public velocidad: number;

  public map: GoogleMap;

  public ubicacion: IUbicacion;
  public marker: Marker;
  public datos: any;
  ubicaciones: any = [{
    id: '',
    data: {} as IUbicacion
  }];
  public markers: Marker[];

  constructor(
    private geolocation: Geolocation,
    private firestoreService: FirestoreService
  ) {

    this.creado = false;
    this.parar = false;
    this.velocidad = 0;
    this.ubicacion = {} as IUbicacion;
    this.ubicaciones = [];
    this.datos = [];
  }

  ngOnInit() {
    // this.watchLocation();
    this.getLocation();
    this.getAll();
  }


  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.ubicacion.lat = resp.coords.latitude;
      this.ubicacion.lng = resp.coords.longitude;
      this.ubicacion.marcador = 'marker_manual555';

      this.loadMap();
      this.insertFirestore();

    }).catch((error) => {
      alert(error);
    });
  }

  watchLocation() {
    const watch = this.geolocation.watchPosition({
      maximumAge: 3000,
      timeout: 5000,
      enableHighAccuracy: true,
    });

    watch.subscribe((data) => {

      this.ubicacion.lat = data.coords.latitude;
      this.ubicacion.lng = data.coords.longitude;

      this.velocidad = data.coords.speed;

      if (!this.creado) {
        this.loadMap();
      }
      /*
            if (!this.parar) {
              this.agregarMarcador();
            }
      */
    });

  }

  moverMarcador() {

  }

  agregarMarcador(ubicacion: IUbicacion) {
    const options: MarkerOptions = {
      icon: {
        url: 'assets/marker_icon.png',
        size: {
          width: 32,
          height: 24
        }
      },
      /*title: 'Hello World',
      snippet: '@ionic-native/google-maps',*/
      position: {
        lat: ubicacion.lat,
        lng: ubicacion.lng
      },
      infoWindowAnchor: [16, 0],
      anchor: [16, 32],
      draggable: true,
      flat: false,
      rotation: 32,
      visible: true,
      styles: {
        'text-align': 'center',
        'font-style': 'italic',
        'font-weight': 'bold'
      },
      animation: GoogleMapsAnimation.DROP,
      zIndex: 0,
      disableAutoPan: true
    };

    this.map.addMarker(options)
      .then((marker: Marker) => {

        // this.marker = marker;
        //  this.ubicacion.marcador = marker.getId();
        // marker.showInfoWindow();

      }, error => {
        alert(error);
      });
    /*
        if (this.ubicacion.id !== ubicacion.id) {

          this.marker.setPosition({
            lat: this.ubicacion.lat,
            lng: this.ubicacion.lng
          });

        } else {

          this.map.addMarker(options).then((marker: Marker) => {
            this.marker = marker;
            this.ubicacion.marcador = marker.getId();
            this.marker.showInfoWindow();

          });

        }
      */
  }

  loadMap() {

    const mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.ubicacion.lat,
          lng: this.ubicacion.lng
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('mapa', mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY).then(this.onMapReady.bind(this));

  }

  onMapReady() {
    this.creado = true;
  }

  salir() {
    this.parar = true;
    this.marker.remove();
    this.firestoreService.eliminar(this.ubicacion.id)
      .then((res) => {
        alert('Saliendo');
      }, (error) => {
        alert(error);
      });
  }

  getAll() {
    this.firestoreService.getAll().subscribe((ubicaciones) => {
      this.ubicaciones = [];
      ubicaciones.forEach((datos: any) => {
        
        this.ubicaciones.push({
          id: datos.payload.doc.id,
          data: datos.payload.doc.data()
        });
      });
      this.ver();
    });
  }

  ver() {
    // alert(this.ubicaciones.length);

    this.ubicaciones.forEach(data => {
      // alert(data.data.lat);
      this.agregarMarcador(data.data);
    });
  }

  insertFirestore() {
    this.firestoreService.create(this.ubicacion)
      .then((ubicacion) => {
        this.ubicacion.id = ubicacion.id;
        alert('Iniciando watch');
      }, (error) => {
        alert(error);
      });
  }

  updateFirestore() {
    this.firestoreService.update(this.ubicacion.id, this.ubicacion)
      .then(a => {

      }, error => {
        alert(error);
      });
  }



}
