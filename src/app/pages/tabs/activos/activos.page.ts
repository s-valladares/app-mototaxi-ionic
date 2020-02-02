import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activos',
  templateUrl: './activos.page.html',
  styleUrls: ['./activos.page.scss'],
})
export class ActivosPage implements OnInit {

  clCercanos: boolean;
  clPreferidos: boolean;
  focusCerca: string;
  focusPreferido: string;

  constructor() {
    this.clCercanos = true;
    this.clPreferidos = false;
    this.focusCerca = 'pressed';
    this.focusPreferido = 'primary';
  }

  ngOnInit() {
  }

  clickCercanos() {
    this.clPreferidos = false;
    this.clCercanos = true;

    this.focusCerca = 'pressed';
    this.focusPreferido = 'primary';

    console.log('Cerca: ', this.clCercanos);
    console.log('Preferidos: ', this.clPreferidos);
  }

  clickPreferidos() {
    this.clCercanos = false;
    this.clPreferidos = true;

    this.focusCerca = 'primary';
    this.focusPreferido = 'pressed';

    console.log('Cerca: ', this.clCercanos);
    console.log('Preferidos: ', this.clPreferidos);
  }


}
