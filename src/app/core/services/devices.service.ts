import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  private apiUrl = 'https://groweasy-back-crecaxa8h3a8cvg8.canadacentral-01.azurewebsites.net/api/v1/swagger-ui/devices'; // Cambia esto a la URL de tu API

  constructor(private http: HttpClient) {}

  // Obtener dispositivos
  getDevices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Agregar dispositivo
  addDevice(deviceData: any): Observable<any> {
    return this.http.post(this.apiUrl, deviceData);
  }

  // Eliminar dispositivo
  deleteDevice(deviceId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${deviceId}`);
  }
}
