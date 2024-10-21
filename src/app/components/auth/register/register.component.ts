import { Component } from '@angular/core';
import { AuthService, Credential } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true, // Asegúrate de marcar el componente como standalone
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: ''
  };

  errorMessage: string | null = null;

  constructor(private router: Router) {}

  // Método para procesar el registro
  register() {
    // Aquí puedes agregar la lógica de registro (conexión a backend o servicio)
    console.log('Registrando usuario:', this.user);

    if (this.user.email && this.user.password && this.user.name) {
      // Simular éxito en el registro y redirigir al login
      this.router.navigate(['/login']);
    } else {
      // Si algún campo está vacío, mostrar mensaje de error
      this.errorMessage = 'Todos los campos son obligatorios';
    }
  }
}
