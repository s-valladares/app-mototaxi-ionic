import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  @ViewChild('slideWithNav3', { static: false }) slideWithNav3: IonSlides;

  sliderThree: any;

  slideOpts = {
    speed: 400,
    allowTouchMove: false,
  };



  constructor(
    private modal: ModalController
  ) { }

  ngOnInit() { }

  // Move to Next slide
  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      console.log('Next');
    });
  }

  cerarModal() {
    this.modal.dismiss();

  }

  b() {
    console.log('cambiada');
  }

}
