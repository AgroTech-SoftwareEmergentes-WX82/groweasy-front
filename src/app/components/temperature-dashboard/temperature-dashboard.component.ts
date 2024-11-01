import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-temperature-device',
  standalone: true,
  templateUrl: './temperature-dashboard.component.html',
  styleUrls: ['./temperature-dashboard.component.css']
})
export class TemperatureDashboardComponent {
  @Input() device!: { name: string; values: { value: number; unitOfMeasure: string; createdAt: string } };

  // Esta función calcula la altura del termómetro en porcentaje
  calculateThermometerHeight(value: number): number {
    // Aquí se asume que la temperatura máxima es 100 grados
    const maxTemperature = 100;
    const minTemperature = 0;

    // Aseguramos que los valores estén dentro del rango [0, 100]
    if (value < minTemperature) return 0;
    if (value > maxTemperature) return 100;

    return (value / maxTemperature) * 100; // Retorna el porcentaje de altura
  }
}