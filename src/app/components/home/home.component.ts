import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../Shared/navbar/navbar.component'; // Importa el NavbarComponent
import { Router } from '@angular/router';
import { LuminosityDashboardComponent } from "../luminosity-dashboard/luminosity-dashboard.component";
import { HumidityDashboardComponent } from "../humidity-dashboard/humidity-dashboard.component";
import { TemperatureDashboardComponent } from "../temperature-dashboard/temperature-dashboard.component";
import { AlertsComponent } from "../alerts/alerts.component";
import { DevicesService } from '../../core/services/devices.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [NavbarComponent, LuminosityDashboardComponent, CommonModule, HumidityDashboardComponent, TemperatureDashboardComponent, AlertsComponent] // Asegúrate de importar el NavbarComponent

})
export class HomeComponent implements OnInit {
  humidityDevices: any[] = [];
  luminosityDevices: any[] = [];
  temperatureDevices: any[] = [];

  constructor(private devicesService: DevicesService) {}

  ngOnInit(): void {
    this.loadDeviceData();
  }

  // Cargar datos de los dispositivos según su tipo
  loadDeviceData() {
    this.devicesService.getDevices().subscribe(
      (devices) => {
        devices.forEach(device => {
          // Convertimos a minúsculas para hacer la comparación insensible a mayúsculas
          const deviceType = device.typeDevice.toLowerCase();
          switch (deviceType) {
            case 'humedad':
              this.humidityDevices.push(device);
              break;
            case 'luminosidad':
              this.luminosityDevices.push(device);
              break;
            case 'temperatura':
              this.temperatureDevices.push(device);
              break;
            default:
              console.warn('Tipo de dispositivo desconocido:', device.typeDevice);
          }
        });
      },
      (error) => {
        console.error('Error al obtener los dispositivos', error);
      }
    );
  }
  
}