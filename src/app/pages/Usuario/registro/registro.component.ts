import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IPersonas, Personas, IUsuario, Usuario, IPilotos, Pilotos } from 'src/app/services/interfaces.index';
import { PersonasService, UsuarioService, PilotosService } from 'src/app/services/services.index';
import { LStorage } from 'src/app/services/misc/storage';
import { constantesId } from 'src/app/services/misc/enums';

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
  serPiloto: boolean;

  btnFinalizar: boolean;
  completed: boolean;

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

    this.mPiloto = Pilotos.empty();
    this.registerPiloto = false;
    this.serPiloto = false;
    this.btnFinalizar = false;
    this.completed = false;
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

          // Guardar id en local storage con constantes
          LStorage.set(constantesId.personaId, this.mPersona.id);

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
      this.mUsuario.enabled = true;
      this.mUsuario.persona = this.mPersona;
      this.serviceUsuarios.newUsuario(this.mUsuario)
        .then(data => {
          console.log(data);
          this.mUsuario = data;

          // Guardar id en local storage con constantes
          LStorage.set(constantesId.usuarioId, this.mUsuario.id);
          this.registerUsuario = true;

          slideView.slideNext(500).then(() => {
            console.log('InsertarUsuario: ');
            this.completed = true;
          });

        })
        .catch(error => {
          console.log(error);
          this.registerUsuario = false;

        });
    } else if (this.registerPersona && this.registerUsuario && !this.registerPiloto) {

      /*
    Ir a registrar piloto
    */

      slideView.slideNext(500).then(() => {
        this.serPiloto = false;
        this.btnFinalizar = true;
        console.log('Registrar piloto: ');

      });


    }
  }

  registrarPiloto(object, slideView) {

    this.mPiloto = this.pilotoForm.value as IPilotos;
    this.mPiloto.usuario = this.mUsuario;
    this.servicePilotos.newPiloto(this.mPiloto)
      .then(data => {
        console.log(data);
        this.mPiloto = data;

        // Guardar id en local storage con constantes
        LStorage.set(constantesId.pilotoId, this.mPiloto.id);

        this.registerPiloto = true;

        slideView.slideTo(4, 500).then(() => {
          console.log('Finalizado');
          this.btnFinalizar = false;

        }).catch(error => {
          console.log(error);
        });

      })
      .catch(error => {
        console.log(error);
        this.registerPiloto = false;
      });

  }

  slideToFinish(object, slideView) {

    slideView.slideTo(4, 500).then(() => {
      console.log('Finalizado');

    }).catch(error => {
      console.log(error);
    });

  }


  finalizar() {
    this.cerarModal();
  }

  onSubmit() {
    this.mPersona = this.personaForm.value as IPersonas;
    console.log(this.mPersona);
  }

  cerarModal() {


    this.modal.dismiss(this.completed);
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
      initialSlide: 0,
      speed: 400,
      allowTouchMove: false,
    };
  }

}
