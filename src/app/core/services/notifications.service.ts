import {inject, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {CreateNotification, GetNotification} from '../model/notification.model';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private apiUrl = environment.API_URL;
  errorHandler = inject(ErrorHandlerService);

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<GetNotification[]> {
    return this.http.get<GetNotification[]>(`${this.apiUrl}/notification/user/getNotifications`).pipe(
      catchError((error) => this.errorHandler.handleError(error))
    );
  }

  addNotifications(notificationData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/notification`, notificationData).pipe(
      catchError((error) => this.errorHandler.handleError(error))
    );
  }

  deleteNotifications(notificationId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/notification/delete/${notificationId}`).pipe(
      catchError((error) => this.errorHandler.handleError(error))
    );
  }

}
