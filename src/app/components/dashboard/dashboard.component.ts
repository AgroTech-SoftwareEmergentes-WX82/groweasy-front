import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {AsyncPipe, CommonModule, DatePipe, NgForOf, NgIf} from '@angular/common';
import {CardModule} from 'primeng/card';
import {IotMqttService} from '../../core/services/iot-mqtt.service';
import {IMqttMessage} from 'ngx-mqtt';
import {ButtonModule} from 'primeng/button';
import {DevicesService} from '../../core/services/devices.service';
import {ToastService} from '../../shared/toast/toast.service';
import {GetDevice} from '../../core/model/device.model';
import {MeterGroupModule} from 'primeng/metergroup';
import {LuminosidadComponent} from '../sensors/luminosity/luminosidad.component';
import {HumidityComponent} from '../sensors/humidity/humidity.component';
import {TemperaturaComponent} from '../sensors/temperature/temperatura.component';
import {FormsModule} from '@angular/forms';
import {ChartModule} from 'primeng/chart';
import {MenuModule} from 'primeng/menu';
import {TableModule} from 'primeng/table';
import {StyleClassModule} from 'primeng/styleclass';
import {PanelMenuModule} from 'primeng/panelmenu';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    DatePipe,
    AsyncPipe,
    CardModule,
    CommonModule,
    FormsModule,
    ChartModule,
    MenuModule,
    TableModule,
    StyleClassModule,
    PanelMenuModule,
    ButtonModule,
    MeterGroupModule,
    LuminosidadComponent,
    HumidityComponent,
    TemperaturaComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, OnDestroy{

  latestMessages = signal<Map<string, string>>(new Map());
  devices = signal<GetDevice[]>([]);
  connectionStatus = false;

  //services
  deviceService = inject(DevicesService);
  iotMqttService = inject(IotMqttService);
  _toastService = inject(ToastService);

  private topic = '/ThinkIOT/hum';


  constructor() {}

  ngOnInit(): void {
    this.loadDevices();
    this.connect();

  }

  ngOnDestroy(): void {
    // Cleanup to avoid memory leaks
    this.disconnect();
  }

  connect(): void {
    this.iotMqttService.connect().subscribe({
      next: () => {
        this.connectionStatus = true;
        this._toastService.sendSuccess('Connected to MQTT Broker!');
        this.subscribeToAllTopics();
      },
      error: (error) => {
        this._toastService.sendError('Connection error:', error);
      },
    });
  }

  disconnect(): void {
    this.iotMqttService.unsubscribe(this.topic);
    this.iotMqttService.disconnect();
    this.connectionStatus = false;
  }

  /*subscribeToTopic(topic: string): void {
    this.iotMqttService.subscribe(topic, 0).subscribe({
      next: (message: IMqttMessage) => {
        const msg = message.payload.toString();
        console.log(`Received from ${topic}: ${msg}`);
        //this.latestMessage.set(msg); // Update your Signal with the received message
      },
      error: (error: string) => {
        this._toastService.sendError(`Error subscribing to topic ${topic}:`, error);
      },
    });
  }*/

  subscribeToAllTopics(): void {
    const devices = this.devices();
    devices.forEach((device) => {
      this.iotMqttService.subscribe(device.topic, 0).subscribe({
        next: (message: IMqttMessage) => {
          const msg = message.payload.toString();
          console.log(`Received from ${device.topic}: ${msg}`);

          // Actualizar el mapa con el último mensaje recibido
          const updatedMessages = new Map(this.latestMessages());
          updatedMessages.set(device.topic, msg);
          this.latestMessages.set(updatedMessages);
        },
        error: (error: string) => {
          this._toastService.sendError(`Error subscribing to topic ${device.topic}:`, error);
        },
      });
    });
  }

  publishMessage(): void {
    this.iotMqttService.publish('/ThinkIOT/Subscribe', 'Hello from DashboardComponent Wilfredo', 1);
  }


  private loadDevices(): void {
    this.deviceService.getDevices().subscribe({
      next: (data) => {
        this.devices.set(data);
      },
      error: (error) => {
        this._toastService.sendError('Error', error);
      },
    });
  }





}
