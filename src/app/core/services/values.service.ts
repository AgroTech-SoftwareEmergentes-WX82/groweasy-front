import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValuesService {
  private apiUrl = 'https://groweasy-back-crecaxa8h3a8cvg8.canadacentral-01.azurewebsites.net/api/v1/values'; // Cambia esto a la URL de tu API
  private tokenKey = 'authToken'; // Clave donde se guarda el token

  constructor(private http: HttpClient) {}

  // Obtener el token desde el almacenamiento local
  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Método para obtener los valores específicos de un dispositivo por ID
  getDeviceValues(deviceId: number): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/device/${deviceId}`;
    return this.http.get<any>(url, { headers }).pipe(
      catchError((error) => {
        console.error(`Error al obtener valores del dispositivo ${deviceId}`, error);
        return throwError(error);
      })
    );
  }

  // Método para configurar las cabeceras con el token
  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
}
