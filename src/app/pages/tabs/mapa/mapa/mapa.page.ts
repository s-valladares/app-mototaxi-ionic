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

@Component({
  selector: 'app-mapa',
  templateUrl: 'mapa.page.html',
  styleUrls: ['mapa.page.scss']
})
export class MapaPage implements OnInit {

  map: GoogleMap;
  creado = false;
  parar = false;

  public position = {
    lat: 0,
    lng: 0
  };

  public marker: Marker;
  public idMarcador: string;

  constructor(
    private geolocation: Geolocation
  ) {
    this.idMarcador = '';
  }

  ngOnInit() {
    this.watchLocation();

  }


  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.position.lat = resp.coords.latitude;
      this.position.lng = resp.coords.longitude;
      if (this.creado === false) {
        this.loadMap();
      }

    }).catch((error) => {
      alert(error);
    });
  }

  watchLocation() {
    const watch = this.geolocation.watchPosition({
      maximumAge: 3000,
      timeout: 5000,
      enableHighAccuracy: true
    });

    watch.subscribe((data) => {
      this.position.lat = data.coords.latitude;
      this.position.lng = data.coords.longitude;
      if (this.creado === false) {
        this.loadMap();
      }

      if (!this.parar) {
        this.agregarMarcador();
      }
    });

  }

  agregarMarcador() {
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
        lat: this.position.lat,
        lng: this.position.lng
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

    if (this.marker != null) {
      this.marker.setPosition({
        lat: this.position.lat,
        lng: this.position.lng
      });
    } else {
      this.map.addMarker(options).then((marker: Marker) => {
        this.marker = marker;
        this.idMarcador = marker.getId();
        this.marker.showInfoWindow();

      });
    }
  }

  loadMap() {

    const mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.position.lat,
          lng: this.position.lng
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
  }

}
