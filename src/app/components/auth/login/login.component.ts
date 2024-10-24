import { Component } from '@angular/core';
import { AuthService, Credential } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule] // Módulos necesarios
})
export class LogInComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          // Redirigir después del login exitoso
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.errorMessage = 'Credenciales inválidas. Intenta de nuevo.';
        }
      });
    }
  }

   // Navegar al componente de registro
   navigateToRegister(): void {
    this.router.navigate(['/register']); // Asegúrate de tener la ruta /register configurada
  }
}
