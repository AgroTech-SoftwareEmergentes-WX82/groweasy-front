import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  activationForm: FormGroup; // Nuevo FormGroup para el token de activación
  errorMessage: string | null = null;
  successMessage: string | null = null;

  showTokenModal = false;
  activationErrorMessage: string | null = null;

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

    this.activationForm = this.fb.group({ // Inicializa el nuevo FormGroup
      activationToken: ['', [Validators.required]] // Agrega el control para el token
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.successMessage = 'Registro exitoso. Ingresa el token de activación.';
          this.showTokenModal = true;
        },
        error: () => {
          this.errorMessage = 'Error en el registro. Intenta de nuevo.';
        }
      });
    }
  }

  validateToken(): void {
    if (this.activationForm.valid) { // Verifica que el formulario sea válido
      const tokenValue = this.activationForm.get('activationToken')?.value; // Obtiene el valor del token
      this.authService.activateAccount(tokenValue).subscribe({
        next: () => {
          this.successMessage = 'Activación exitosa. Redirigiendo al login...';
          this.closeTokenModal();
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err) => {
          this.activationErrorMessage = typeof err === 'string' ? err : 'Token de activación inválido.';
        }
      });
    }
  }

  closeTokenModal(): void {
    this.showTokenModal = false;
    this.activationForm.reset(); // Limpia el formulario de activación
    this.activationErrorMessage = null;
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
