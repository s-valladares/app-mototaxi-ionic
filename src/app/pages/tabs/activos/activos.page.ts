import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activos',
  templateUrl: './activos.page.html',
  styleUrls: ['./activos.page.scss'],
})
export class ActivosPage implements OnInit {

  clCercanos: boolean;
  clPreferidos: boolean;

  constructor() {
    this.clCercanos = true;
    this.clPreferidos = false;
  }

  ngOnInit() {
  }

  clickCercanos() {
    this.clPreferidos = false;
    this.clCercanos = true;
    console.log('Cerca: ', this.clCercanos);
    console.log('Preferidos: ', this.clPreferidos);
  }

  clickPreferidos() {
    this.clCercanos = false;
    this.clPreferidos = true;
    console.log('Cerca: ', this.clCercanos);
    console.log('Preferidos: ', this.clPreferidos);
  }


}
