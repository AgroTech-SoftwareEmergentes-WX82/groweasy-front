import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Necesario en standalone components

@Component({
  selector: 'app-temperature-dashboard',
  standalone: true,  // Indicamos que es un componente standalone
  imports: [CommonModule],  // Importamos CommonModule para utilizar directivas como *ngIf, *ngFor, etc.
  templateUrl: './temperature-dashboard.component.html',
  styleUrls: ['./temperature-dashboard.component.css'],
})
export class TemperatureDashboardComponent implements OnInit {
  temperature: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getTemperature();
  }

  getTemperature(): void {
    this.http.get('https://api.example.com/temperature')
      .subscribe((data: any) => {
        this.temperature = data.temperature;
      });
  }
}
