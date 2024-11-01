import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-luminosity-device',
  standalone: true,
  templateUrl: './luminosity-dashboard.component.html',
  styleUrls: ['./luminosity-dashboard.component.css'],
  imports: [CommonModule]
})
export class LuminosityDashboardComponent {
  @Input() device: any; // Se espera recibir el dispositivo como input

  calculateOpacity(value: number | undefined): number {
    if (value === undefined) return 0; // Si no hay valor, la opacidad es 0
    return Math.min(Math.max(value / 100, 0), 1); // Normaliza el valor entre 0 y 1
  }
}