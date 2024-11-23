import {inject, Injectable} from '@angular/core';

import {
  IMqttMessage,
  IMqttServiceOptions,
  MqttService,
  IPublishOptions,
} from 'ngx-mqtt';
import { IClientSubscribeOptions } from 'mqtt-browser';
import {map, Observable, Subscription} from 'rxjs';
import {ToastService} from '../../shared/toast/toast.service';

@Injectable({
  providedIn: 'root'
})

export class IotMqttService {

  private connection = {
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
  };

  private client: MqttService;
  private _toastService = inject(ToastService);
  private activeSubscriptions: Map<string, Subscription> = new Map();

  constructor(private mqttService: MqttService) {
    this.client = mqttService;
  }

  connect(): Observable<void> {
    return new Observable((observer) => {
      try {
        this.client.connect(this.connection as IMqttServiceOptions);
        this.client.onConnect.subscribe(() => {
          observer.next();
          observer.complete();
          console.log('Connection succeeded!');
        });
        this.client.onError.subscribe((error: any) => {
          observer.error(error);
          console.error('Connection failed:', error);
        });
      } catch (error: any) {
        observer.error(error);
        console.error('Unexpected error during connection:', error);
      }
    });
  }

  disconnect(): void {
    this.unsubscribeAll(); // Asegura cancelar todas las suscripciones antes de desconectar
    this.client.disconnect(true);
    this._toastService.sendSuccess('Successfully disconnected!');
  }

  subscribe(topic: string, qos: number): Observable<IMqttMessage> {
    return new Observable((observer) => {
      if (this.activeSubscriptions.has(topic)) {
        this._toastService.sendWarn(`Already subscribed to topic: ${topic}`);
        return; // Si ya hay una suscripción activa, no se suscribe de nuevo
      }

      const subscription = this.client.observe(topic, { qos } as IClientSubscribeOptions)
        .subscribe({
          next: (message: IMqttMessage) => {
            observer.next(message); // Envía el mensaje al observable
          },
          error: (error) => {
            this._toastService.sendError(`Error during subscription to topic "${topic}":`, error);
            observer.error(error);
          },
        });

      this.activeSubscriptions.set(topic, subscription); // Guarda la suscripción activa
      this._toastService.sendInfo(`Subscribed to topic: ${topic}`);
    });
  }

  unsubscribe(topic: string): void {
    const subscription = this.activeSubscriptions.get(topic);
    if (subscription) {
      subscription.unsubscribe();
      this.activeSubscriptions.delete(topic); // Elimina la referencia
      this._toastService.sendInfo(`Unsubscribed from topic: ${topic}`);
    } else {
      this._toastService.sendWarn(`No active subscription found for topic: ${topic}`);
    }
  }

  unsubscribeAll(): void {
    this.activeSubscriptions.forEach((subscription, topic) => {
      subscription.unsubscribe();
      console.log(`Unsubscribed from topic: ${topic}`);
    });
    this.activeSubscriptions.clear(); // Limpia todas las referencias
    console.log('Unsubscribed from all topics');
  }

  publish(topic: string, payload: string, qos: number): void {
    this.client.unsafePublish(topic, payload, { qos } as IPublishOptions);
    console.log(`Message published to topic "${topic}" with payload: ${payload}`);
  }

}
