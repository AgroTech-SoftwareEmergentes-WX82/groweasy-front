import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ValueSensor} from '../model/valueSensor.model';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValueSensorService {

  private apiUrl = environment.API_URL;
  errorHandler = inject(ErrorHandlerService);

  constructor(private http: HttpClient) {}

  getValueSensor(idDevice: number): Observable<ValueSensor> {
    return this.http.get<ValueSensor>(`${this.apiUrl}/values/lastValueSensor/${idDevice}`).pipe(
      catchError((error) => this.errorHandler.handleError(error))
    );
  }



}
