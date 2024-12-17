import { Component, OnInit } from '@angular/core';
import { RegisterPatientsService } from '../services/register-patients.service'; // Servicio para obtener datos
import { RegisterParametersService } from '../services/register-parameters.service'; // Servicio para obtener parámetros

@Component({
  selector: 'app-register-patients',
  templateUrl: './register-patients.component.html',
  styleUrls: ['./register-patients.component.css'],
  standalone: false
})
export class RegisterPatientsComponent implements OnInit {
  pacientes: any[] = []; // Lista de pacientes
  pacienteSeleccionado: any = null; // Paciente actual al que se ven los detalles
  condicionMedica: string = ''; // Condición médica del paciente
  parametros: any[] = []; // Campos dinámicos según la condición médica

  // Objeto para almacenar los valores de los parámetros
  parametrosDinamicos: { [key: string]: any } = {};

  constructor(
    private registerPatientsService: RegisterPatientsService,
    private registerParametersService: RegisterParametersService
  ) {}

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes(): void {
    const medicoId = Number(localStorage.getItem('medicoId'));
    if (medicoId) {
      this.registerPatientsService.obtenerPacientesPorMedico(medicoId).subscribe(
        (data) => {
          this.pacientes = data;
        },
        (error) => {
          console.error('Error al cargar los pacientes:', error);
        }
      );
    } else {
      console.error('No se encontró el ID del médico en localStorage');
    }
  }

  verDetalles(pacienteId: number): void {
    this.pacienteSeleccionado = this.pacientes.find(p => p.id === pacienteId);
    if (this.pacienteSeleccionado) {
      this.cargarCondicionMedica();
    }
  }

  cargarCondicionMedica(): void {
    this.registerParametersService.obtenerCondicionMedica(this.pacienteSeleccionado.id).subscribe({
      next: (response: { condicionMedica: string }) => {
        this.condicionMedica = response.condicionMedica;
        this.cargarParametrosPaciente();
      },
      error: (error) => {
        console.error('Error al obtener la condición médica:', error);
      },
    });
  }

  cargarParametrosPaciente(): void {
    // Aquí cargas los parámetros médicos del paciente
    this.registerParametersService.obtenerParametros(this.pacienteSeleccionado.id).subscribe({
      next: (response: any) => {
        this.parametrosDinamicos = response; // Asignamos los valores obtenidos del backend
        this.actualizarPantalla();
      },
      error: (error) => {
        console.error('Error al obtener los parámetros del paciente:', error);
      }
    });
  }

  actualizarPantalla(): void {
    // Configuración de parámetros basada en la condición médica
    if (this.condicionMedica === 'Diabetes') {
      this.parametros = [
        { label: 'Glucosa (mg/dL)', name: 'nivelGlucosa' },
        { label: 'Nivel de Actividad Física', name: 'nivelActividadFisica' },
      ];
    } else if (this.condicionMedica === 'EPOC') {
      this.parametros = [
        { label: 'Frecuencia Respiratoria (rpm)', name: 'frecuenciaRespiratoria' },
        { label: 'Nivel de Saturación de O2 (%)', name: 'saturacionO2' },
      ];
    } else if (this.condicionMedica === 'Hipertension') {
      this.parametros = [
        { label: 'Presión Arterial (mmHg)', name: 'presionArterial' },
        { label: 'Frecuencia Cardíaca (bpm)', name: 'frecuenciaCardiaca' },
      ];
    }
  }

  // Método para mostrar el valor de cada parámetro
  obtenerValorParametro(param: string): any {
    return this.parametrosDinamicos[param];
  }
}
