import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface Credential {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://groweasy-back-crecaxa8h3a8cvg8.canadacentral-01.azurewebsites.net/api/v1';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  // Método de inicio de sesión
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/authenticate`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem(this.tokenKey, response.token);
      }),
      catchError((error) => {
        console.error('Error during login', error);
        return throwError(error);
      })
    );
  }

  // Método de registro
  register(user: { firstname: string; lastname: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, user).pipe(
      catchError((error) => {
        if (error.status === 500 && error.error && error.error.businessErrorDescription) {
          if (error.error.businessErrorDescription.includes("duplicate key")) {
            return throwError("Este correo ya está registrado. Por favor, intenta con otro.");
          }
        }
        console.error('Error during registration', error);
        return throwError(error.error.businessErrorDescription || 'Error interno, por favor contacta al administrador.');
      })
    );
  }

   // Método de activación de cuenta
   activateAccount(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/activate-account`, { params: { token } }).pipe(
      tap((response) => {
        console.log('Account activated successfully', response);
      }),
      catchError((error) => {
        // Validar si el error es por un token incorrecto o no autorizado
        if (error.status === 401 || error.status === 400) {
          return throwError('El token de activación es incorrecto o ha expirado. Por favor, revisa el token e intenta de nuevo.');
        }
        console.error('Error during account activation', error);
        return throwError('Error durante la activación de la cuenta. Por favor, contacta al soporte.');
      })
    );
  }
  
  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Verificar si el usuario está autenticado (si existe un token)
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  // Obtener el token almacenado
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
