import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PViajesPage } from './p-viajes.page';

const routes: Routes = [
  {
    path: '',
    component: PViajesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PViajesPageRoutingModule {}
