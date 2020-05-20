import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { SettingsComponent } from '../settings/settings/settings.component';
import { ChatComponent } from '../Tabs/mensajes/chat/chat/chat.component';

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
      },
      {
        path: 'activos',
        loadChildren: () => import('../Tabs/activos/activos.module').then( m => m.ActivosPageModule)
      },
      {
        path: 'mensajes',
        loadChildren: () => import('../Tabs/mensajes/mensajes.module').then( m => m.MensajesPageModule)
      },
      {
        path: 'register',
        loadChildren: () => import('../Usuario/register/register.module').then( m => m.RegisterPageModule)
      },
      {
        path: 'p-viajes',
        loadChildren: () => import('../Tabs/p-viajes/p-viajes.module').then( m => m.PViajesPageModule)
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
    SettingsComponent,
    ChatComponent
  ],
  entryComponents: [
    SettingsComponent,
    ChatComponent,
  ]
})
export class HomePageModule { }
