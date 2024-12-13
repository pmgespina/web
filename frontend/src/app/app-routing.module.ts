import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeMedicoComponent } from './home-medico/home-medico.component';
import { RegisterParametersComponent } from './register-parameters/register-parameters.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { MensajesComponent } from './messaging/messaging.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Ruta principal
  { path: 'home', component: HomeComponent }, 
  { path: 'home-medico', component: HomeMedicoComponent },
  { path: 'register', component: RegisterParametersComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'messaging', component: MensajesComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
