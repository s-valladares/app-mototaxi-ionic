import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { SettingsComponent } from '../settings/settings/settings.component';

const routes: Routes = [{
  path: '',
  redirectTo: '/home/mapa',
  pathMatch: 'full'
},
{
  path: '',
  component: HomePage,
  children:
    [
      {
        path: 'mapa',
        loadChildren: () => import('../Tabs/mapa/mapa.module').then(m => m.MapaPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../Usuario/perfil/perfil.module').then(m => m.PerfilPageModule)
      }

    ]
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomePage,
    SettingsComponent
  ],
  entryComponents: [
    SettingsComponent
  ]
})
export class HomePageModule { }
