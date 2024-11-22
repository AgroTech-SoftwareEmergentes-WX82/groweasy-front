import {inject, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {GetStatistics} from '../model/statistics.model';

import {ErrorHandlerService} from '../../shared/error-handler.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = environment.API_URL;
  errorHandler = inject(ErrorHandlerService);

  constructor(private http: HttpClient) {}

  getStatistics(params: { key: string; value: string }[]): Observable<any> {
    const httpParams = params.reduce((acc, param) => {
      acc[param.key] = param.value;
      return acc;
    }, {} as any);
  
    return this.http.get<any>(`${this.apiUrl}/values/sensor-statistics`, { params: httpParams });
  }
  
}
