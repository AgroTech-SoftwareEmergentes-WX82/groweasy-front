import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-humidity-device',
  standalone: true,
  templateUrl: './humidity-dashboard.component.html',
  styleUrls: ['./humidity-dashboard.component.css'],
  imports: [CommonModule]
})
export class HumidityDashboardComponent implements OnInit {
  @Input() device: any;
  humidityPercentage: number = 0;

  ngOnInit() {
    this.humidityPercentage = this.device.values.value; // Obtener el valor de humedad
  }
}
