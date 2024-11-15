import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AsyncPipe, DatePipe, NgForOf, NgIf} from '@angular/common';
import {SensorComponent} from '../sensor/sensor.component';
import {CardModule} from 'primeng/card';
import {IotMqttService} from '../../core/services/iot-mqtt.service';
import {IMqttMessage} from 'ngx-mqtt';
import {Button} from 'primeng/button';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    DatePipe,
    AsyncPipe,
    SensorComponent,
    CardModule,
    Button
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit{

  receivedMessages: string[] = [];
  connectionStatus = false;

  constructor(private iotMqttService: IotMqttService) {}

  ngOnInit(): void {
    this.connect();
  }

  connect(): void {
    this.iotMqttService.connect().subscribe({
      next: () => {
        this.connectionStatus = true;
        console.log('Connected to MQTT Broker');
        this.subscribeToTopic();
      },
      error: (error) => console.error('Connection error', error),
    });
  }

  disconnect(): void {
    this.iotMqttService.disconnect();
    this.connectionStatus = false;
  }

  subscribeToTopic(): void {
    this.iotMqttService.subscribe('/ThinkIOT/temp', 1).subscribe({
      next: (message: IMqttMessage) => {
        const msg = message.payload.toString();
        this.receivedMessages.push(msg);
        console.log(`Received: ${msg}`);
      },
      error: (error) => {
        console.error('Error in subscription:', error);
      },
    });
  }

  publishMessage(): void {
    this.iotMqttService.publish('/ThinkIOT/Subscribe', 'Hello from DashboardComponent Wilfredo', 1);
  }



}
