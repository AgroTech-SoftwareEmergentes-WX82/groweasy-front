import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../Shared/navbar/navbar.component'; // Importa el NavbarComponent
import { Router } from '@angular/router';
import { LuminosityDashboardComponent } from "../luminosity-dashboard/luminosity-dashboard.component";
import { HumidityDashboardComponent } from "../humidity-dashboard/humidity-dashboard.component";
import { TemperatureDashboardComponent } from "../temperature-dashboard/temperature-dashboard.component";
import { AlertsComponent } from "../alerts/alerts.component";
import { DevicesService } from '../../core/services/devices.service';
import { CommonModule } from '@angular/common';
import { ValuesService } from '../../core/services/values.service';

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

  constructor(private devicesService: DevicesService, private valuesService: ValuesService) {}

  ngOnInit(): void {
    this.loadDeviceData();
  }
 loadDeviceData() {
    this.devicesService.getDevices().subscribe(
      (devices) => {
        console.log('Dispositivos recibidos:', devices);

        // Para cada dispositivo, obtenemos los valores y los agregamos
        devices.forEach(device => {
          this.valuesService.getDeviceValues(device.id).subscribe(
            (values) => {
              device.values = values;
              console.log(`Valores obtenidos para el dispositivo ${device.id}:`, values);

              // Clasificamos el dispositivo en el array correspondiente
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
            },
            (error) => {
              console.error(`Error al obtener los valores del dispositivo ${device.id}`, error);
            }
          );
        });
      },
      (error) => {
        console.error('Error al obtener los dispositivos', error);
      }
    );
  }
}