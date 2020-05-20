import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PViajesPageRoutingModule } from './p-viajes-routing.module';

import { PViajesPage } from './p-viajes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PViajesPageRoutingModule
  ],
  declarations: [PViajesPage]
})
export class PViajesPageModule {}
