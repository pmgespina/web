import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Importa el archivo de configuración del entorno

@Injectable({
  providedIn: 'root', // Este servicio estará disponible globalmente
})
export class AppointmentsService {
  private apiUrl = `${environment.baseUrl}/citas`; // URL base del backend

  constructor(private http: HttpClient) {}

  // Método para obtener todas las citas
  getCitas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Método para añadir una nueva cita
  addCita(cita: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, cita);
  }

  // Método para actualizar una cita existente
  updateCita(id: number, cita: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, cita);
  }

  // Método para eliminar una cita
  deleteCita(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
