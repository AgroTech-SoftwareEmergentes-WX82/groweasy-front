import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  private apiUrl = 'https://groweasy-back-crecaxa8h3a8cvg8.canadacentral-01.azurewebsites.net/api/v1/devices'; // Cambia esto a la URL de tu API
  private tokenKey = 'authToken'; // Clave donde se guarda el token

  constructor(private http: HttpClient) {}

  // Obtener el token desde el almacenamiento local
  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Método para obtener la lista de dispositivos
  getDevices(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
      catchError((error) => {
        console.error('Error al obtener los dispositivos', error);
        return throwError(error);
      })
    );
  }

  // Método para agregar un nuevo dispositivo
  addDevice(deviceData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.apiUrl, deviceData, { headers }).pipe(
      catchError((error) => {
        console.error('Error al agregar el dispositivo', error);
        return throwError(error);
      })
    );
  }

  // Método para eliminar un dispositivo
  deleteDevice(deviceId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/${deviceId}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error al eliminar el dispositivo', error);
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
