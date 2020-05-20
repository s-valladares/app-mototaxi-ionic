import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IPersonas, Personas, IUsuario, Usuario, IPilotos } from 'src/app/services/interfaces.index';
import { PersonasService, UsuarioService, PilotosService } from 'src/app/services/services.index';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  @ViewChild('slideNav', { static: false }) slideNav: IonSlides;
  sliderThree: any;
  slideOpts: any;

  registerPersona: boolean;
  personaForm: FormGroup;
  mPersona: IPersonas;
  mPersonas: IPersonas[];

  registerUsuario: boolean;
  usuarioForm: FormGroup;
  mUsuario: IUsuario;
  mUsuarios: IUsuario[];

  registerPiloto: boolean;
  pilotoForm: FormGroup;
  mPiloto: IPilotos;
  mPilotos: IPilotos[];

  constructor(
    private modal: ModalController,
    private formBuilder: FormBuilder,
    private servicePersonas: PersonasService,
    private serviceUsuarios: UsuarioService,
    private servicePilotos: PilotosService
  ) {
    this.mPersona = Personas.empty();
    this.registerPersona = false;

    this.mUsuario = Usuario.empty();
    this.registerUsuario = false;
  }

  ngOnInit() {
    this.opcionesSlide();
    this.generarFormularioPersona();
    this.generarFormularioUsuario();
    this.generarFormularioPiloto();
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

    /*
    Registrar Persona y dar next en slide
    */
    if (!this.registerPersona) {
      this.mPersona = this.personaForm.value as IPersonas;
      this.servicePersonas.newPersona(this.mPersona)
        .then(data => {
          console.log(data);
          this.mPersona = data;
          this.registerPersona = true;

          slideView.slideNext(500).then(() => {
            console.log('Insertarpersona: ');

          });

        })
        .catch(error => {
          console.log(error);
          this.registerPersona = false;
        });
    } else if (this.registerPersona && !this.registerUsuario) {

      /*
    Registrar Usuario y dar next en slide
    */
      this.mUsuario = this.usuarioForm.value as IUsuario;
      this.mUsuario.persona = this.mPersona;
      this.serviceUsuarios.newUsuario(this.mUsuario)
        .then(data => {
          console.log(data);
          this.mUsuario = data;
          this.registerUsuario = true;

          slideView.slideNext(500).then(() => {
            console.log('InsertarUsuario: ');

          });

        })
        .catch(error => {
          console.log(error);
          this.registerUsuario = false;
        });
    } else if (this.registerPersona && this.registerUsuario && !this.registerPiloto) {

      /*
    Registrar Piloto y dar next en slide
    */
      this.mPiloto = this.pilotoForm.value as IPilotos;
      this.mPiloto.usuario = this.mUsuario;
      this.servicePilotos.newPiloto(this.mPiloto)
        .then(data => {
          console.log(data);
          this.mPiloto = data;
          this.registerPiloto = true;



          slideView.slideNext(500).then(() => {
            console.log('InsertarPiloto: ');

          });

        })
        .catch(error => {
          console.log(error);
          this.registerPiloto = false;
        });
    }
  }

  slideTo(object, slideView) {

    slideView.slideTo(0, 500).then(() => {
      console.log('Ir a : ');

    }).catch(error => {
      console.log(error);
    });

  }

  onSubmit() {
    this.mPersona = this.personaForm.value as IPersonas;
    console.log(this.mPersona);
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

  generarFormularioUsuario() {
    this.usuarioForm = this.formBuilder.group({
      email: [null],
      password: [null]
    });
  }

  generarFormularioPiloto() {
    this.pilotoForm = this.formBuilder.group({
      licencia: [null],
      activo: [null]
    });
  }

  opcionesSlide() {
    this.slideOpts = {
      speed: 400,
      allowTouchMove: false,
    };
  }

}
