import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TableroComponent } from './components/tablero/tablero.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { EditarClienteComponent } from './components/editar-cliente/editar-cliente.component';
import { NoPageComponent } from './components/no-page/no-page.component';

const routes: Routes = [
  { path: '', component: TableroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'configuracion', component: ConfiguracionComponent },
  { path: 'cliente/editar/:id', component: EditarClienteComponent },
  { path: '**', component: NoPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
