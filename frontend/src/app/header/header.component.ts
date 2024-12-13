import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showHeader: boolean = true; // Controla la visibilidad del header
  rol: string | null = null;

  constructor(private router: Router) {
    // Escucha los cambios de la ruta activa
    this.router.events.subscribe(() => {
      // Oculta el header en la ruta '/login'
      this.showHeader = this.router.url !== '/login';
    });
  }

  ngOnInit(): void {
    // Rol del usuario desde el almacenamiento local
    this.rol = localStorage.getItem('rol');
    console.log('Rol del usuario:', this.rol); // Verifica en consola
    if (!this.rol) {
      console.error('Rol no definido. Redirigiendo al login...');
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    // Limpia los datos del almacenamiento local 
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
