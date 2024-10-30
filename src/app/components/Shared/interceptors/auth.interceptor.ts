import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service'; // Ajusta la ruta si es necesario
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpInterceptor implements HttpInterceptor {
  private authService = inject(AuthService); // Servicio de autenticación
  private router = inject(Router); // Servicio de enrutamiento
  private baseUrl: string = 'https://groweasy-back-crecaxa8h3a8cvg8.canadacentral-01.azurewebsites.net/api/v1'; // Define aquí tu baseUrl

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const jwt = this.authService.getToken(); // Obtener el token

    // Si la URL comienza con el baseUrl y hay un token, añade el encabezado de autorización
    if (req.url.startsWith(this.baseUrl) && jwt) {
      const authRequest = req.clone({
        setHeaders: {
          authorization: `Bearer ${jwt}`,
        },
      });

      // Maneja el error en la solicitud
      return next.handle(authRequest).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            // Redirige al login si la respuesta es 401 (no autorizado)
            this.router.navigate(['/login'], {
              queryParams: { redirectUrl: this.router.routerState.snapshot.url },
            });
          }
          return throwError(() => err);
        })
      );
    } else {
      // Si no es una URL que necesita el token, pasa la solicitud original
      return next.handle(req);
    }
  }
}
