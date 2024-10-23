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
  private token: string | null = null;// Clave para almacenar el token en localStorage

  constructor(private http: HttpClient, private router: Router) {}

  // Método para iniciar sesión
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate`, credentials).pipe(
      tap((response: any) => {
        // Aquí guardas el token en el localStorage o en una variable
        this.token = response.token; // Asumiendo que el token viene en la respuesta
        if (this.token) {
          localStorage.setItem('token', this.token);
        }
      })
    );
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return this.token !== null;
  }

}
