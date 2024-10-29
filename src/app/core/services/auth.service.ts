import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private apiUrl = 'https://groweasy-back-crecaxa8h3a8cvg8.canadacentral-01.azurewebsites.net/api/v1'; // Cambia esto por la URL de tu backend
  private tokenKey = 'authToken'; // Clave de almacenamiento para el token

  constructor(private http: HttpClient) {}

  // Método de inicio de sesión
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/authenticate`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem(this.tokenKey, response.token); // Guardar el token
        console.log(this.tokenKey);
      }),
      catchError((error) => {
        console.error('Error during login', error);
        return throwError(error);
      })
    );


  }

  // Método de registro
  register(user: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, user).pipe(
      catchError((error) => {
        console.error('Error during registration', error);
        return throwError(error);
      })
    );
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem(this.tokenKey); // Eliminar el token
  }

  // Verificar si el usuario está autenticado (si existe un token)
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  // Obtener el token almacenado
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Método para obtener datos del usuario (requiere autenticación)
  getUserData(): Observable<any> {
    const token = this.getToken(); // Obtener el token
    if (!token) {
      return throwError('No token found');
    }

    // Configurar las cabeceras con el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Incluir el token en la cabecera
    });

    // Realizar la petición al endpoint protegido con el token en la cabecera
    return this.http.get(`${this.apiUrl}/user/profile`, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching user data', error);
        return throwError(error);
      })
    );
  }
}
