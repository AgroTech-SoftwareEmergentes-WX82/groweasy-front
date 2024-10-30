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
  import { AuthService } from './auth.service'; // Ajusta la ruta según corresponda
  import { Router } from '@angular/router';
  import { UiService } from './ui.service'; // Ajusta la ruta según corresponda
  import { environment } from '../environments/environment';
  
  @Injectable({
    providedIn: 'root',
  })
  export class AuthHttpInterceptor implements HttpInterceptor {
    private authService = inject(AuthService);
    private router = inject(Router);
    private uiService = inject(UiService);
  
    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      const jwt = this.authService.getToken();
      const baseUrl = environment.baseUrl;
  
      if (req.url.startsWith(baseUrl) && jwt) {
        const authRequest = req.clone({
          setHeaders: {
            authorization: `Bearer ${jwt}`,
          },
        });
  
        return next.handle(authRequest).pipe(
          catchError((err: HttpErrorResponse) => {
            this.uiService.showToast(err.error.message);
            
            if (err.status === 401) {
              this.router.navigate(['/login'], {
                queryParams: { redirectUrl: this.router.routerState.snapshot.url },
              });
            }
            
            return throwError(() => err);
          })
        );
      } else {
        return next.handle(req);
      }
    }
  }
  