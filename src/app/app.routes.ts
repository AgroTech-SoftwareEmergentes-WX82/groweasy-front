
import { RegisterComponent } from './components/auth/register/register.component';
import { LogInComponent } from './components/auth/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige a la ruta de login por defecto
  { path: 'login', component: LogInComponent }, // Ruta para el login
  { path: 'register', component: RegisterComponent }, // Ruta para el componente de register
  // Puedes agregar más rutas aquí
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }