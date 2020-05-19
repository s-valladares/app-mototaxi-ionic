import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './config/config.service';

import {
    PersonasService,
    PilotosService,
    VehiculosService,
    UbicacionesService,
    UsuarioService,
    AuthService
} from './services.index';



@NgModule({
   declarations: [],
    imports: [
        HttpClientModule,
        CommonModule
    ],
    providers: [
        UsuarioService,
        PersonasService,
        PilotosService,
        VehiculosService,
        UbicacionesService,
        AuthService,
        ConfigService,

    ]
})
export class ServicesModule { }
