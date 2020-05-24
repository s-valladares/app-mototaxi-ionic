import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IUsuario } from 'src/app/services/interfaces.index';
import { AuthService, UsuarioService } from 'src/app/services/services.index';
import { ToastController, ModalController } from '@ionic/angular';
import decode from 'jwt-decode';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { RegistroComponent } from '../registro/registro.component';
import { EncryptAndStorage } from 'src/app/services/misc/storage';
import { acciones, constantesDatosToken } from 'src/app/services/misc/enums';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  mLogin: IUsuario;
  usuario: IUsuario;

  passwordTypeInput = 'password';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController,
    private modalController: ModalController,
    private setting: SettingsService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.generarFormLogin();
  }

  onFormSubmit() {

    this.usuario = this.loginForm.value as IUsuario;
    this.loginOauth();
    /*
        this.authService.Login(this.mLogin)
          .then(res => {
            this.authService.isLoggedIn = res.token;
            localStorage.setItem('fly', res.token);
            this.router.navigate(['/home']);
            console.log(res.token);

            const user: any = decode(res.token);
            this.setting.SetToke(res.token);

          }).catch(error => {
            console.log(error);
            this.presentToast('Credenciales Invalidas');
          });

    */
  }

  loginOauth() {

    this.usuarioService.loginOauth(this.usuario).subscribe(response => {
      const payload = decode(response.access_token);
      this.setting.ecryptAndStorageToken(payload);
      EncryptAndStorage.setEncryptStorage(constantesDatosToken.token, response.access_token);

      alert('Bienvenido ');

      EncryptAndStorage.setEncryptStorage(acciones.recordar, this.usuario.recordar);

      if (this.usuario.recordar) {
        EncryptAndStorage.setEncryptStorage(acciones.password, this.usuario.password);
      }

      this.router.navigate(['/home']);
    }, err => {
      if (err.status === 400) {
        alert('Datos incorrectos');
      }
    });
  }

  togglePasswordMode() {
    if (this.passwordTypeInput === 'text') {
      this.passwordTypeInput = 'password';
    } else {
      this.passwordTypeInput = 'text';
    }

  }

  generarFormLogin() {

    const r = EncryptAndStorage.getEncryptStorage(acciones.recordar);
    const e = EncryptAndStorage.getEncryptStorage(constantesDatosToken.email);
    const p = EncryptAndStorage.getEncryptStorage(acciones.password);

    this.loginForm = this.formBuilder.group({
      email: e,
      password: p,
      recordar: r
    });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async modalRegistro() {
    const modal = await this.modalController.create({
      component: RegistroComponent,
      componentProps: {
        tipoModal: 'config'
      }
    });

    modal.onDidDismiss().then(data => {
      console.log(data.data);
      if (data.data) {
        this.router.navigate(['/home/mapa']);
      }

    }).catch(error => {
    });

    return await modal.present();
  }

}
