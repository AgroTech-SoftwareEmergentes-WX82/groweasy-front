import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { LuminosityService } from '../../core/services/luminosity.service'; // Importar el servicio de luminosidad

@Component({
  selector: 'app-luminosity-dashboard',
  templateUrl: './luminosity-dashboard.component.html',
  styleUrls: ['./luminosity-dashboard.component.scss'],
  standalone: true, // Hacer el componente standalone
  imports: [CommonModule, DatePipe], // Importar CommonModule y DatePipe
})
export class LuminosityDashboardComponent implements OnInit {
  luminosityData: { luminosity: number; timestamp: string } | null = null; // Almacena los datos

  constructor(private luminosityService: LuminosityService) {} // Inyectar el servicio

  ngOnInit(): void {
    this.getLuminosityData();
  }

  // Método para obtener los datos de humedad del backend
  getLuminosityData(): void {
    this.luminosityService.getLuminosity().subscribe(
      (data) => {
        this.luminosityData = data;
      },
      (error) => {
        console.error('Error fetching luminosity data:', error);
      }
    );
  }
}