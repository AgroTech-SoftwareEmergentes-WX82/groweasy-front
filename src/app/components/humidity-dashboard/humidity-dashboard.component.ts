import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-humidity-device',
  standalone: true,
  templateUrl: './humidity-dashboard.component.html',
  styleUrls: ['./humidity-dashboard.component.css']
})
export class HumidityDashboardComponent {
  @Input() device!: { name: string; values: { value: number; unitOfMeasure: string; createdAt: string } };

  // Esta función calcula la altura del agua en porcentaje
  calculateWaterHeight(value: number): number {
    const maxHumidity = 100; // Asumimos que el 100% es el nivel máximo de humedad
    const minHumidity = 0;    // Mínimo de humedad

    // Aseguramos que los valores estén dentro del rango [0, 100]
    if (value < minHumidity) return 0;
    if (value > maxHumidity) return maxHumidity;

    return (value / maxHumidity) * 100; // Retorna el porcentaje de altura
  }
}