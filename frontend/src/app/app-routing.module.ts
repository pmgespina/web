import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterParametersComponent } from './register-parameters/register-parameters.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { MessagingComponent } from './messaging/messaging.component';


const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta principal
  { path: 'home', component: HomeComponent }, 
  { path: 'register', component: RegisterParametersComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'messaging', component: MessagingComponent },
  //{ path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
