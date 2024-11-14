import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Necesario en standalone components
import { TemperatureService } from '../../core/services/temperature.service'; // Importar el servicio de luminosidad

@Component({
  selector: 'app-temperature-dashboard',
  standalone: true,  // Indicamos que es un componente standalone
  imports: [CommonModule],  // Importamos CommonModule para utilizar directivas como *ngIf, *ngFor, etc.
  templateUrl: './temperature-dashboard.component.html',
  styleUrls: ['./temperature-dashboard.component.scss'],
})
export class TemperatureDashboardComponent implements OnInit {
  temperatureData: { temperature: number; timestamp: string } | null = null; // Almacena los datos

  constructor(private temperatureService: TemperatureService) {} // Inyectar el servicio

  ngOnInit(): void {
    this.getTemperatureData();
  }

  getTemperatureData(): void {
    this.temperatureService.getTemperature().subscribe(
      (data) => {
        this.temperatureData = data;
      },
      (error) => {
        console.error('Error fetching temperature data:', error);
      }
    );
  }
}