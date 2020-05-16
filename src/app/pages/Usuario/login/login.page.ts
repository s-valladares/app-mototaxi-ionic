import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IUsuario } from 'src/app/services/interfaces.index';
import { AuthService } from 'src/app/services/services.index';
import { ToastController } from '@ionic/angular';
import decode from 'jwt-decode';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  mLogin: IUsuario;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    public toastController: ToastController,
    private setting: SettingsService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [null],
      password: [null]
    });
  }

  onFormSubmit() {

    this.mLogin = this.loginForm.value as IUsuario;

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


  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

}
