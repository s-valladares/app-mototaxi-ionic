import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IPersonas, Personas } from 'src/app/services/interfaces.index';
import { PersonasService } from 'src/app/services/services.index';
import { runInThisContext } from 'vm';

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
  mPersonas: IPersonas[];

  constructor(
    private modal: ModalController,
    private formBuilder: FormBuilder,
    private servicePersonas: PersonasService
  ) { 
    this.mPersona = Personas.empty();
  }

  ngOnInit() {
    this.opcionesSlide();
    this.generarFormularioPersona();
    // this.getAllPersonas();
  }

  /*
  getAllPersonas() {
    this.servicePersonas.All()
      .then(data => {
        this.mPersonas = data.rows;
        console.log(this.mPersonas);
      })
      .catch(error => {
        console.log(error);
      });
  }
*/

  // Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      console.log('Prev');
    });
  }

  // Move to Next slide
  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      console.log('Insertarpersona: ');
      console.log(this.newPersona());
    });
  }

  onSubmit() {
    this.mPersona = this.personaForm.value as IPersonas;
    console.log(this.mPersona);
  }

  newPersona(): boolean {
    this.mPersona = this.personaForm.value as IPersonas;
    console.log(this.mPersona);
    let resp = false;
    this.servicePersonas.newPersona(this.mPersona)
      .then(data => {
        console.log(data);
        resp = true;
        return resp;
      })
      .catch(error => {
        console.log(error);
        return resp;
      });
    return resp;
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
