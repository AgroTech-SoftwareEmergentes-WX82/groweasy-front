import { Injectable } from '@angular/core';

import {
  IMqttMessage,
  IMqttServiceOptions,
  MqttService,
  IPublishOptions,
} from 'ngx-mqtt';
import { IClientSubscribeOptions } from 'mqtt-browser';
import {map, Observable, Subscription} from 'rxjs';

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
  private curSubscription: Subscription | undefined;

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
          console.log('Connection succeeded! service');
        });
        this.client.onError.subscribe((error: any) => {
          observer.error(error);
          console.error('Connection failed:', error);
        });
      } catch (error) {
        observer.error(error);
        console.error('Unexpected error during connection:', error);
      }
    });
  }

  disconnect(): void {
    this.client.disconnect(true);
    console.log('Successfully disconnected!');
  }

  subscribe(topic: string, qos: number): Observable<IMqttMessage> {
    return new Observable((observer) => {
      this.curSubscription = this.client
        .observe(topic, { qos } as IClientSubscribeOptions)
        .subscribe({
          next: (message: IMqttMessage) => {
            observer.next(message); // Envía el mensaje al observable
          },
          error: (error) => {
            console.error('Error during subscription:', error);
            observer.error(error);
          },
        });
    });
  }

  unsubscribe(): void {
    this.curSubscription?.unsubscribe();
    console.log('Unsubscribed successfully');
  }

  publish(topic: string, payload: string, qos: number): void {
    this.client.unsafePublish(topic, payload, { qos } as IPublishOptions);
    console.log('Message published successfully');
  }

  /*onMessage(): Observable<IMqttMessage> {
    return this.client.onMessage.pipe(
      map((packet: any) => {
        const mqttMessage!: IMqttMessage = {
          topic: packet.topic,
          payload: packet.payload,
          qos: packet.qos,
          retain: packet.retain,
          dup: packet.dup
        };
        return mqttMessage;
      })
    );
  }*/

}
