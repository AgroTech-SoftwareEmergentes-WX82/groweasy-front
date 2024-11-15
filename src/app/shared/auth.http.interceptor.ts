import { HttpHandlerFn, HttpRequest } from '@angular/common/http'
import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import {AuthService} from '../core/services/auth.service';
import {environment} from '../../environments/environment';


export function AuthHttpInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authService = inject(AuthService)
  const router = inject(Router)
  //const uiService = inject(UiService)

  const jwt = authService.getToken()
  const baseUrl = environment.API_URL

  if (req.url.startsWith(baseUrl) && jwt) {
    const authRequest = req.clone({ setHeaders: { authorization: `Bearer ${jwt}` } })
    return next(authRequest).pipe(
      catchError((err) => {
        //uiService.showToast(err.error.message)
        if (err.status === 401) {
          router.navigate(['/login'], {
            queryParams: { redirectUrl: router.routerState.snapshot.url },
          })
        }
        return throwError(() => err)
      })
    )
  } else {
    return next(req)
  }
}
