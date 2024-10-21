import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface Credential {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://your-backend-api.com'; // Cambia esta URL por la de tu backend
  private tokenKey = 'authToken'; // Clave para almacenar el token en localStorage

  constructor(private http: HttpClient, private router: Router) {}

  // Método para registrar al usuario
  signUp(credential: Credential): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, credential).pipe(
      tap((response: any) => this.storeToken(response.token)),
      catchError(this.handleError)
    );
  }

  // Método para iniciar sesión
  logIn(credential: Credential): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credential).pipe(
      tap((response: any) => this.storeToken(response.token)),
      catchError(this.handleError)
    );
  }

  // Método para cerrar sesión
  logOut(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']); // Redirige al login después de cerrar sesión
  }

  // Método para verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey); // Comprueba si hay un token
  }

  // Método para obtener el token actual
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Método para almacenar el token en localStorage
  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Método para manejar errores
  private handleError(error: any): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error del servidor: ${error.status} ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
