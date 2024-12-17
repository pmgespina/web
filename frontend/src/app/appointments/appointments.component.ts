import { Component } from '@angular/core';
import { AppointmentsService } from '../services/appointments.service';

@Component({
  selector: 'app-appointments',
  standalone: false,
  
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent {
  mesActual: string = '';
  anoActual: number = 0;
  semanas: any[] = []; 
  citas: any[] = [];
  dias: string[] = ['L', 'M', 'X', 'J', 'V', 'S', 'D']; 
  mesIndex: number = 0;

  medicoId: number | null = null; 
  pacienteId: number | null = null;

  constructor(private appointmentsService: AppointmentsService) {}

  ngOnInit() {

    const storedMedicoId = localStorage.getItem('medicoId');
    const storedPacienteId = localStorage.getItem('pacienteId');
    if (storedMedicoId) {
      this.medicoId = parseInt(storedMedicoId, 10); // Convertir a número
    } else if (storedPacienteId) {
      this.pacienteId = parseInt(storedPacienteId, 10);
      console.log('ID de Paciente encontrado:', this.pacienteId);
    } else {
      console.error('No se encontró medicoId ni pacienteId en localStorage.');
      return; // Salir si no hay IDs
    }

    const today = new Date();
    this.mesActual = today.toLocaleString('default', { month: 'long' }); 
    this.anoActual = today.getFullYear(); 
    this.updateMesActual();
    this.generateCalendar(today.getMonth(), today.getFullYear());
    this.cargarCitas();
  }

  cargarCitas() {
    this.appointmentsService.getCitas().subscribe(
      (data) => {
        console.log('Citas recibidas del backend:', data);
  
        if (this.medicoId) {
          // Filtrar por medicoId
          this.citas = data.filter((cita) => cita.medico.id === this.medicoId);
          console.log('Citas filtradas por medicoId:', this.citas);
        } else if (this.pacienteId) {
          // Filtrar por pacienteId
          this.citas = data.filter((cita) => cita.paciente.id === this.pacienteId);
          console.log('Citas filtradas por pacienteId:', this.citas);
        }
  
        this.addAppointmentsToCalendar();
      },
      (error) => {
        console.error('Error al cargar las citas:', error);
      }
    );
  }
  

  // Agregar citas al calendario
  addAppointmentsToCalendar() {
    this.semanas.forEach((week) => {
      week.forEach((day: any) => {
        if (day) {
          const calendarDate = new Date(this.anoActual, this.mesIndex, day.day);
          const calendarDateStr = calendarDate.toISOString().split('T')[0];
  
          const citasDelDia = this.citas.filter((cita) => {
            if (cita.fechaHora) {
              const citaFechaStr = cita.fechaHora.split('T')[0];
              return citaFechaStr === calendarDateStr;
            }
            return false;
          });
  
          day.citas = citasDelDia;
        }
      });
    });
  
    console.log('Calendario con citas asignadas:', this.semanas);
  }
  
  updateMesActual() {
    const date = new Date(this.anoActual, this.mesIndex, 1);
    this.mesActual = date.toLocaleString('default', { month: 'long' });
  }
  
  generateCalendar(month: number, year: number) {
    const dUno = new Date(year, month, 1); // Primer día del mes
    const dUltimo = new Date(year, month + 1, 0); // Último día del mes
  
    const daysInMonth = dUltimo.getDate();
    const startDayOfWeek = (dUno.getDay() + 6) % 7; // Lunes como día 0
  
    let currentDay = 1;
    const weeks = [];
  
    for (let i = 0; i < 6; i++) { // Máximo 6 semanas
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startDayOfWeek) {
          week.push(null); // Espacios vacíos antes del inicio del mes
        } else if (currentDay > daysInMonth) {
          week.push(null); // Espacios vacíos después del final del mes
        } else {
          week.push({ day: currentDay, citas: [] }); // Día válido
          currentDay++;
        }
      }
      weeks.push(week);
      if (currentDay > daysInMonth) break;
    }
  
    this.semanas = weeks;
    console.log('Calendario generado para:', month, year);
  }
  
  
  prevMonth() {
    if (this.mesIndex === 0) {
      this.mesIndex = 11; // Volver a diciembre del año anterior
      this.anoActual--;
    } else {
      this.mesIndex--;
    }
    this.updateMesActual();
    this.generateCalendar(this.mesIndex, this.anoActual);
    this.addAppointmentsToCalendar();
  }
  
  nextMonth() {
    if (this.mesIndex === 11) {
      this.mesIndex = 0; // Avanzar a enero del año siguiente
      this.anoActual++;
    } else {
      this.mesIndex++;
    }
    this.updateMesActual();
    this.generateCalendar(this.mesIndex, this.anoActual);
    this.addAppointmentsToCalendar();
  }

  
  
}
