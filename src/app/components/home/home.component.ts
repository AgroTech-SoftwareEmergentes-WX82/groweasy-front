import { Component } from '@angular/core';
import { NavbarComponent } from '../Shared/navbar/navbar.component'; // Importa el NavbarComponent
import { Router } from '@angular/router';
import { LuminosityDashboardComponent } from "../luminosity-dashboard/luminosity-dashboard.component";
import { HumidityDashboardComponent } from "../humidity-dashboard/humidity-dashboard.component";
import { TemperatureDashboardComponent } from "../temperature-dashboard/temperature-dashboard.component";
import { AlertsComponent } from "../alerts/alerts.component";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [NavbarComponent, LuminosityDashboardComponent, HumidityDashboardComponent, TemperatureDashboardComponent, AlertsComponent] // Asegúrate de importar el NavbarComponent

})
export class HomeComponent {
  constructor(private router: Router) {}

  goToChatbot() {
    this.router.navigate(['/chatbot']);
  }

  goToDevices() {
    this.router.navigate(['/devices']);
  }
}
