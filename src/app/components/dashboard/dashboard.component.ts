import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {GetDevice} from '../../core/model/device.model';
import {DevicesService} from '../../core/services/devices.service';
import {ValueSensorService} from '../../core/services/value-sensor.service';
import {ValueSensor} from '../../core/model/valueSensor.model';
import {forkJoin, Observable, of} from 'rxjs';
import {AsyncPipe, DatePipe, NgForOf, NgIf} from '@angular/common';
import {catchError} from 'rxjs/operators';
import {SensorComponent} from '../sensor/sensor.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    DatePipe,
    AsyncPipe,
    SensorComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  devices: GetDevice[] = [];
  sensorValues: ValueSensor[] = [];
  loading: boolean = true; // Loading state

  constructor(
    private deviceService: DevicesService,
    private valueSensorService: ValueSensorService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDevices();
  }

  private loadDevices(): void {
    this.deviceService.getDevices().subscribe({
      next: (devices) => {
        this.devices = devices;
        this.loadValueSensors();
      },
      error: (err) => {
        console.error('Error loading devices', err);
        this.loading = false; // Stop loading on error
      }
    });
  }

  private loadValueSensors(): void {
    const valueSensorRequests = this.devices.map(device =>
      this.valueSensorService.getValueSensor(device.id).pipe(
        catchError(err => {
          console.error(`Error fetching sensor value for device ${device.id}`, err);
          return of(null); // Return null on error
        })
      )
    );

    forkJoin(valueSensorRequests).subscribe({
      next: (values) => {
        this.sensorValues = values.filter(value => value !== null);
        this.loading = false; // Stop loading when done
        this.changeDetectorRef.detectChanges(); // Trigger change detection if needed
      },
      error: (err) => {
        console.error('Error loading sensor values', err);
        this.loading = false; // Stop loading on error
      }
    });
  }
}
