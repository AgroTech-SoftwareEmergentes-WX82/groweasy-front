import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-luminosity-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './luminosity-dashboard.component.html',
  styleUrls: ['./luminosity-dashboard.component.css'],
})
export class LuminosityDashboardComponent implements OnInit {
  luminosity: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getLuminosity();
  }

  getLuminosity(): void {
    this.http.get('https://api.example.com/luminosity')
      .subscribe((data: any) => {
        this.luminosity = data.luminosity;
      });
  }
}
