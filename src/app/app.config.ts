import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {AuthHttpInterceptor} from './shared/auth.http.interceptor';
import {IMqttServiceOptions, MqttModule} from 'ngx-mqtt';

export const connection: IMqttServiceOptions = {
  hostname: '79a52ee9b42246daaa17cd9272cff7af.s1.eu.hivemq.cloud',
  port: 8884,
  path: '/mqtt',
  clean: true, // Mantener una sesión limpia
  connectTimeout: 4000, // Tiempo de espera para la conexión
  reconnectPeriod: 4000, // Intervalo para intentar reconexión
  clientId: 'mqttx_597046f4', // Opcional pero recomendado
  username: 'agrotech',
  password: 'Agrotech02$',
  protocol: 'wss', // Cambiar de "ws" a "wss"
  connectOnCreate: false,
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([AuthHttpInterceptor]),
      withFetch()
    ),
    provideAnimationsAsync(),
    importProvidersFrom(MqttModule.forRoot(connection))
  ]
};
