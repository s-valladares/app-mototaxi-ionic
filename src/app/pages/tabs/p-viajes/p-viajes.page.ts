import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-p-viajes',
  templateUrl: './p-viajes.page.html',
  styleUrls: ['./p-viajes.page.scss'],
})
export class PViajesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    console.log('Segmento activo: ', ev.detail.value);
  }

}
