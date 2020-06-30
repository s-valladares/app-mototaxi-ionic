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
import { AuthService } from 'src/app/services/services.index';
import { IUbicaciones, Ubicaciones } from 'src/app/services/interfaces.index';

@Component({
  selector: 'app-mapa',
  templateUrl: 'mapa.page.html',
  styleUrls: ['mapa.page.scss']
})
export class MapaPage implements OnInit {

  public creado: boolean;
  public parar: boolean;
  public velocidad: number;

  public optionsMarker: MarkerOptions;
  public mapOptions: GoogleMapOptions;

  public map: GoogleMap;

  public ubicacion: IUbicacion;
  public ubicaciones: IUbicacion[];
  public marker: Marker;
  public markers: any[];
  public idMarcador: string;

  public location: IUbicaciones;

  constructor(
    private geolocation: Geolocation,
    private firestoreService: FirestoreService,
    private service: AuthService,
  ) {

    this.creado = false;
    this.parar = false;
    this.velocidad = 0;
    this.ubicacion = Ubicacion.empty();
    this.ubicaciones = [];
    this.idMarcador = '';

    this.location = Ubicaciones.empty();
  }

  ngOnInit() {
    // this.watchLocation();
    this.getLocation();
    // this.getAll();
    // this.getAllBlog();
  }

  ionViewDidLoad() {
    // your code;
  }

  getAllBlog() {
    this.service.Blog()
      .then(data => {
        console.log(data);

      }).catch(error => {

        console.log(error);
      });
  }


  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.location.latitud = resp.coords.latitude.toString();
      this.location.longitud = resp.coords.longitude.toString();

      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);
      // this.loadMap();

    }).catch((error) => {
      console.log(error);
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

  agregarMarcador(lati, lngi) {

    this.optionsMarker = {
      icon: {
        url: 'assets/marker_icon.png',
        size: {
          width: 32,
          height: 24
        }
      },

      position: {
        lat: lati,
        lng: lngi
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

      zIndex: 0,
      disableAutoPan: true
    };

    this.optionsMarker.position.lat = lati;
    this.optionsMarker.position.lng = lngi;

    return this.map.addMarkerSync(this.optionsMarker);


    // this.activar();
    /*
        this.map.addMarker(this.optionsMarker)
          .then((marker: Marker) => {
            this.idMarcador = marker.getId();
            alert(this.idMarcador);
          }, error => {
            alert(error);
          });
    */

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

    this.mapOptions = {
      camera: {
        target: {
          lat: this.ubicacion.lat,
          lng: this.ubicacion.lng
        },
        zoom: 18,
        tilt: 30
      }
    };


    this.map = GoogleMaps.create('mapa', this.mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY).then(this.onMapReady.bind(this));
  }

  onMapReady() {
    this.creado = true;
  }

  salir() {
    // this.parar = true;
    this.marker.remove();
    this.firestoreService.eliminar(this.ubicacion.id)
      .then((res) => {
      }, (error) => {
        alert(error);
      });
  }

  getAll() {
    this.firestoreService.getAll()
      .subscribe((ubicaciones) => {

        this.ubicaciones = [];

        ubicaciones
          .forEach((datos: any) => {

            this.ubicaciones.push(datos.payload.doc.data());

            try {
              if (datos.payload.doc.data().marcador !== this.ubicacion.marcador) {
                this.agregarMarcador(datos.payload.doc.data().lat, datos.payload.doc.data().lng);
              }
            } catch (error) {
              alert(error);
            }

          });

      }, error => alert(error));

  }

  insertLocFb() {

    

/*
    this.marker = this.agregarMarcador(this.ubicacion.lat, this.ubicacion.lng);
    this.ubicacion.marcador = this.marker.getId();

    this.firestoreService.create(this.ubicacion)
      .then(ubicacion => this.ubicacion.id = ubicacion.id)
      .catch(error => alert(error));
*/
  }

  updateFirestore() {
    this.firestoreService.update(this.ubicacion.id, this.ubicacion)
      .then(a => {

      }, error => {
        alert(error);
      });
  }

}
