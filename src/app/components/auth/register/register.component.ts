import { Component } from '@angular/core';
import { AuthService, Credential } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true, // Asegúrate de marcar el componente como standalone
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null; // Añadir mensaje de éxito

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.successMessage = 'Registro exitoso. Redirigiendo al login...'; // Mensaje de éxito
          setTimeout(() => {
            this.router.navigate(['/login']); // Redirigir al login después de un pequeño retraso
          }, 2000); // Espera de 2 segundos antes de redirigir
        },
        error: () => {
          this.errorMessage = 'Error en el registro. Intenta de nuevo.'; // Mensaje de error en caso de fallo
        }
      });
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']); // Redirigir al login si ya tiene una cuenta
  }
}