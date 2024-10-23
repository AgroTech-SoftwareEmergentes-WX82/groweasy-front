import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule aquí

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule], 
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLoggedIn = false; // Variable para verificar si el usuario está autenticado
  userName = 'Carlos'; // Nombre del usuario que puede ser dinámico

  constructor(private router: Router) {}

  // Navega al perfil del usuario
  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  // Método para cerrar sesión
  logout() {
    this.isLoggedIn = false;
    // Lógica adicional para cerrar sesión
    this.router.navigate(['/login']);
  }
}
