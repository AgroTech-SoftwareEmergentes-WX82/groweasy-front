import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ButtonDirective} from 'primeng/button';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    ButtonDirective
  ]
})
export class NavbarComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('authToken'); // Eliminar el token de autenticación
    this.router.navigate(['/login']); // Redirigir al login
  }
  onNavigateStatistics() {
    this.router.navigate(['/statistics']); 
  }
  onNavigateNotifications() {
    this.router.navigate(['/notifications']); 
  }
  onNavigateDevices() {
    this.router.navigate(['/devices']); 
  }
  onNavigateHome() {
    this.router.navigate(['/home']); 
  }
}
