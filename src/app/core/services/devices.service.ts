import {inject, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {CreateDevice, GetDevice} from '../model/device.model';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  private apiUrl = environment.API_URL;
  errorHandler = inject(ErrorHandlerService);

  constructor(private http: HttpClient) {}

  getDevices(): Observable<GetDevice[]> {
    return this.http.get<GetDevice[]>(`${this.apiUrl}/devices`).pipe(
      catchError((error) => this.errorHandler.handleError(error))
    );
  }

  addDevice(deviceData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/devices`, deviceData).pipe(
      catchError((error) => this.errorHandler.handleError(error))
    );
  }

  deleteDevice(deviceId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/devices/${deviceId}`).pipe(
      catchError((error) => this.errorHandler.handleError(error))
    );
  }

}
