import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TemperatureService {
  private apiUrl = 'https://671abe9eacf9aa94f6ab8dc6.mockapi.io/temperature/2'; // Cambia por tu API real
  private tokenKey = 'authToken'; // Clave donde se guarda el token

  constructor(private http: HttpClient) {}

  getTemperature(): Observable<{ temperature: number; timestamp: string }> {
    const token = this.getToken();

    if (!token) {
      return throwError('Token not found');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, 
    });

    return this.http
      .get<{ temperature: number; timestamp: string }>(this.apiUrl, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error fetching temperature data', error); 
          return throwError(error);
        })
      );
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey); // Recuperar el token guardado en localStorage
  }
}
