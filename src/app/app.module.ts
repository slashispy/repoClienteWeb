import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuarioService } from './services/usuarios/usuario-service.service';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PerfilService } from './services/perfil/perfil-service.service';
import { ReporteComponent } from './components/reporte/reporte.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    PerfilComponent,
    ReporteComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    CommonModule,
    RouterModule.forRoot([
    {
        path: 'usuarios',
        component: UsuariosComponent
    },{
        path: 'perfiles',
        component: PerfilComponent
    },{
      path: 'reporte',
      component: ReporteComponent
    }
    ])
  ],
  providers: [
    UsuarioService,
    PerfilService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
