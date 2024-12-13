import { Component } from '@angular/core';

@Component({
  selector: 'app-parametros-medico',
  standalone: false,
  
  templateUrl: './parametros-medico.component.html',
  styleUrl: './parametros-medico.component.css'
})
export class ParametrosMedicoComponent {
  pacientes = [
    {
      id: 1,
      nombre: 'Juan Pérez',
      ultimoRegistro: '2024-12-12',
      parametros: {
        glucosa: '120 mg/dL',
      }
    },
    {
      id: 2,
      nombre: 'María García',
      edad: 50,
      ultimoRegistro: '2024-12-11',
      parametros: {
        glucosa: '110 mg/dL',
        presionArterial: '125/80 mmHg',
        peso: '65 kg'
      }
    }
  ];
  constructor() {}

  ngOnInit(): void {}

  verDetalle(id: number): void {
    console.log(`Ver detalle del paciente con ID: ${id}`);
    // redirigir a una vista detallada del paciente
  }
}
