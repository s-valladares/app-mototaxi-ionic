import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IPersonas } from 'src/app/services/interfaces.index';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  @ViewChild('slideNav', { static: false }) slideNav: IonSlides;
  sliderThree: any;
  slideOpts: any;

  personaForm: FormGroup;
  mPersona: IPersonas;

  constructor(
    private modal: ModalController,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.opcionesSlide();
    this.generarFormularioPersona();
  }

  // Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      console.log('Prev');
    });
  }

  // Move to Next slide
  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      console.log('Next');
    });
  }

  newPersona(): boolean {
    return true;
  }

  cerarModal() {
    this.modal.dismiss();
  }

  generarFormularioPersona() {
    this.personaForm = this.formBuilder.group({
      nombres: [null],
      apellidos: [null],
      direccion: [null],
      telefono: [null]
    });
  }

  opcionesSlide() {
    this.slideOpts = {
      speed: 400,
      allowTouchMove: false,
    };
  }

}
