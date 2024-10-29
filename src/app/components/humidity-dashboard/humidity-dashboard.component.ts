import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { HumidityService } from '../../core/services/humidity.service'; // Asegúrate de importar tu servicio

@Component({
  selector: 'app-humidity-dashboard',
  templateUrl: './humidity-dashboard.component.html',
  styleUrls: ['./humidity-dashboard.component.css'],
  standalone: true, // Hacer el componente standalone
  imports: [CommonModule, DatePipe], // Importar CommonModule y DatePipe
})
export class HumidityDashboardComponent implements OnInit {
  humidityData: { humidity: number; timestamp: string } | null = null;

  constructor(private humidityService: HumidityService) {} // Inyectar el servicio

  ngOnInit(): void {
    this.getHumidityData();
  }

  // Método para obtener los datos de humedad del backend
  getHumidityData(): void {
    this.humidityService.getHumidity().subscribe(
      (data) => {
        this.humidityData = data;
      },
      (error) => {
        console.error('Error fetching humidity data:', error);
      }
    );
  }
}