import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
})
export class NavbarComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('authToken'); // Eliminar el token de autenticación
    this.router.navigate(['/login']); // Redirigir al login
  }
  onNavigateNotifications() {
    this.router.navigate(['/notifaciones']); // Redirigir al login
  }
  onNavigateDevices() {
    this.router.navigate(['/devices']); // Redirigir al login
  }
  onNavigateHome() {
    this.router.navigate(['/home']); // Redirigir al login
  }
}
