import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Disponible globalmente
})
export class HumidityService {
  private apiUrl = 'https://groweasy-back-crecaxa8h3a8cvg8.canadacentral-01.azurewebsites.net/api/v1'; // Cambia por tu API real
  private tokenKey = 'authToken'; // Clave con la que se guarda el token

  constructor(private http: HttpClient) {}

  // Método que retorna la humedad y el timestamp desde el backend
  getHumidity(): Observable<{ humidity: number; timestamp: string }> {
    const token = this.getToken(); // Obtener el token desde el localStorage

    // Si no hay token, lanzar un error o manejarlo de alguna forma
    if (!token) {
      throw new Error('Token not found');
    }

    // Añadir el token en las cabeceras de la petición
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // El token se añade como Bearer token
    });

    // Realizar la petición con el token en las cabeceras
    return this.http.get<{ humidity: number; timestamp: string }>(this.apiUrl, { headers });
  }

  // Método para obtener el token desde localStorage
  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey); // Recuperar el token guardado en localStorage
  }
}
