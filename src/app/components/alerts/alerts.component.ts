import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
})
export class AlertsComponent implements OnInit {
  alerts: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAlerts();
  }

  getAlerts(): void {
    this.http.get('https://api.example.com/alerts')
      .subscribe((data: any) => {
        this.alerts = data.alerts;
      });
  }
}
