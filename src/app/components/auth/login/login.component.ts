import { Component } from '@angular/core';
import { AuthService, Credential } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule aquí

@Component({
  selector: 'app-login',
  standalone: true, // Asegúrate de marcar el componente como standalone
  imports: [FormsModule, CommonModule, RouterModule], // Importa FormsModule aquí
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LogInComponent {
  credentials: Credential = { email: '', password: '' };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  logIn() {
    console.log('Intentando iniciar sesión...');
    this.authService.logIn(this.credentials).subscribe({
      next: () => {
        console.log('Sesión iniciada con éxito');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = err.message;
        console.error('Error de inicio de sesión:', err);
      },
    });
  }
}
