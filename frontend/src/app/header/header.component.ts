import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  showHeader: boolean = true; // Controla la visibilidad del header

  constructor(private router: Router) {
    // Escucha los cambios de la ruta activa
    this.router.events.subscribe(() => {
      // Oculta el header en la ruta '/login'
      this.showHeader = this.router.url !== '/login';
    });
  }
}
