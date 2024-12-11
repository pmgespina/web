import { Component } from '@angular/core';

@Component({
  selector: 'app-register-parameters',
  standalone: false,
  
  templateUrl: './register-parameters.component.html',
  styleUrl: './register-parameters.component.css'
})
export class RegisterParametersComponent {
  onSubmit() {
    console.log('Parámetros registrados');
  }
}
