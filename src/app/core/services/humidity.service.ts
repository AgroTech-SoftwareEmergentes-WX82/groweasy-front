import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HumidityService {
  private apiUrl = 'https://671abe9eacf9aa94f6ab8dc6.mockapi.io/humidity/2'; // Cambia por tu API real
  private tokenKey = 'authToken'; // Clave donde se guarda el token

  constructor(private http: HttpClient) {}

  // Método que retorna la humedad y el timestamp desde el backend
  getHumidity(): Observable<{ humidity: number; timestamp: string }> {
    const token = this.getToken(); // Obtener el token desde el localStorage

    // Si no hay token, lanzar un error o manejarlo de alguna forma
    if (!token) {
      return throwError('Token not found'); // Retorna un observable con error
    }

    // Añadir el token en las cabeceras de la petición
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // El token se añade como Bearer token
    });

    // Realizar la petición con el token en las cabeceras
    return this.http
      .get<{ humidity: number; timestamp: string }>(this.apiUrl, { headers }) // Usa la URL definida en el servicio
      .pipe(
        catchError((error) => {
          console.error('Error fetching humidity data', error); // Manejo de errores
          return throwError(error); // Manejo de errores para el subscribe
        })
      );
  }

  // Método para obtener el token desde localStorage
  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey); // Recuperar el token guardado en localStorage
  }
}
