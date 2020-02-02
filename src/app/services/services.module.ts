import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


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
        AuthService

    ]
})
export class ServicesModule { }
