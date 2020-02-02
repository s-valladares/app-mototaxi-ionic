import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivosPageRoutingModule } from './activos-routing.module';

import { ActivosPage } from './activos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivosPageRoutingModule
  ],
  declarations: [ActivosPage]
})
export class ActivosPageModule {}
