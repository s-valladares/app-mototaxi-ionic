import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './config/config.service';


import {
    UsuarioService, AuthService
} from './services.index';



@NgModule({
   declarations: [],
    imports: [
        HttpClientModule,
        CommonModule
    ],
    providers: [

        UsuarioService,
        AuthService,
        ConfigService

    ]
})
export class ServicesModule { }
