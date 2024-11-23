import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { StatisticsService } from '../../core/services/statistics.service';
import { ToastService } from '../../shared/toast/toast.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [NavbarComponent, FormsModule, ChartModule],
  providers: [ConfirmationService], 
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent implements OnInit {
  startDate: string = '';
  endDate: string = '';
  deviceId: number | null = null;

  data: any = null; // Datos para el gráfico
  options: any = { scales: { y: {} } }; // Initialize options with scales

  private toastService = inject(ToastService);
  private statisticsService = inject(StatisticsService);

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
  }

  fetchData() {
    const documentStyle = getComputedStyle(document.documentElement); // Re-declarar aquí
    const formatDateWithSeconds = (date: string): string => {
      const d = new Date(date);
      const pad = (n: number): string => (n < 10 ? '0' + n : n.toString());
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ` +
             `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    };
  
    if (!this.startDate || !this.endDate || this.deviceId === null) {
      this.toastService.sendError('Campos incompletos', 'Por favor, completa todos los campos requeridos.');
      return;
    }
  
    const params = [
      { key: 'startDate', value: formatDateWithSeconds(this.startDate) },
      { key: 'endDate', value: formatDateWithSeconds(this.endDate) },
      { key: 'deviceId', value: this.deviceId.toString() },
    ];
  
    this.statisticsService.getStatistics(params).subscribe({
      next: (response: any) => {
        console.log('API Response:', response);

        if (!response || !Array.isArray(response)) {
          this.toastService.sendError('Datos inválidos', 'La respuesta del servidor no tiene datos válidos.');
          return;
        }
  
        const chartData = response.map((item: any) => ({
          time: item.time,
          avgValue: item.avgValue,
        }));

        const minValue = Math.min(...chartData.map((item: any) => item.avgValue));
        const maxValue = Math.max(...chartData.map((item: any) => item.avgValue));
  
        this.data = {
          labels: chartData.map((item: any) => item.time),
          datasets: [
            {
              label: 'Valor Promedio',
              data: chartData.map((item: any) => item.avgValue),
              borderColor: documentStyle.getPropertyValue('--blue-500'),
              backgroundColor: 'rgba(66, 165, 245, 0.2)',
              tension: 0.4,
            },
          ],
        };
  
        this.options.scales.y = {
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            color: documentStyle.getPropertyValue('--text-color-secondary'),
          },
          grid: {
            color: documentStyle.getPropertyValue('--surface-border'),
          },
          min: Math.floor(minValue - 1),
          max: Math.ceil(maxValue + 1),
        };

        this.toastService.sendSuccess('Datos obtenidos', 'Las estadísticas se han cargado correctamente.');
      },
      error: (error) => {
        this.toastService.sendError('Error', 'No se pudieron cargar las estadísticas.');
        console.error('Error fetching statistics:', error);
      },
    });
  }

}