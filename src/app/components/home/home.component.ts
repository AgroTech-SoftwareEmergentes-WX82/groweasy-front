import { Component, OnInit } from '@angular/core';

import { TemperatureDashboardComponent } from "../temperature-dashboard/temperature-dashboard.component";
import { AlertsComponent } from "../alerts/alerts.component";
import { DevicesService } from '../../core/services/devices.service';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from '../../shared/navbar/navbar.component';
import {DashboardComponent} from '../dashboard/dashboard.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    NavbarComponent,
    CommonModule,
    TemperatureDashboardComponent,
    AlertsComponent,
    DashboardComponent
  ]

})
export class HomeComponent {


}
