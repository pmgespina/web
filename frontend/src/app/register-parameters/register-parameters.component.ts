import { Component } from '@angular/core';

@Component({
  selector: 'app-register-parameters',
  standalone: false,
  
  templateUrl: './register-parameters.component.html',
  styleUrl: './register-parameters.component.css'
})
export class RegisterParametersComponent {
  condicionMedica: string = "Hipertension" // metodo get del backend a la bbdd
  parametros: any[] = []; //parametros para llevar al html 

  ngOnInit():void{
    this.actualizarPantalla();
  }

  actualizarPantalla(){
    if (this.condicionMedica === 'Diabetes') {
      this.parametros = [
        { label: 'Glucosa (mg/dL)', type: 'number', name: 'glucosa', required: true },
        { label: 'Nivel de Actividad Física', type: 'text', name: 'actividad', required: true },
      ];
    } else if (this.condicionMedica === 'EPOC') {
      this.parametros = [
        { label: 'Frecuencia Respiratoria (rpm)', type: 'number', name: 'frecuenciaRespiratoria', required: true },
        { label: 'Nivel de Saturación de O2 (%)', type: 'number', name: 'saturacion', required: true },
      ];
    } else if (this.condicionMedica === 'Hipertension') {
      this.parametros = [
        { label: 'Presión Arterial (mmHg)', type: 'text', name: 'presion', required: true },
        { label: 'Frecuencia Cardiaca (bpm)', type: 'number', name: 'frecuenciaCardiaca', required: true },
      ];
    }
  }
  onSubmit() {
    console.log('Parámetros registrados');
    //aquí hay que mandar los parametros al backend (post??)
  }
}
