import { Component, OnInit } from '@angular/core';
import { HumidityService } from '../../core/services/humidity.service';
import { CommonModule, DatePipe } from '@angular/common';

import { RouterModule } from '@angular/router';
 
@Component({
  selector: 'app-humidity',
  templateUrl: './humidity-dashboard.component.html',
  styleUrls: ['./humidity-dashboard.component.css'],
  standalone: true,
  imports: [DatePipe, CommonModule, RouterModule], // Importamos CommonModule para utilizar directivas como *ngIf, *ngFor, etc.
  providers: [HumidityService], // Proveedor para asegurar que el servicio esté disponible
})
export class HumidityDashboardComponent implements OnInit {
  humidityData: { humidity: number; timestamp: string } | undefined;
  constructor(private humidityService: HumidityService) {}

  ngOnInit(): void {
    // Llamar al servicio de humedad con autenticación
    this.humidityService.getHumidity().subscribe(
      (data) => {
        this.humidityData = data; // Guardar los datos de la respuesta
      },
      (error) => {
        console.error('Error fetching humidity data', error); // Manejo de errores
      }
    );
  }
}
