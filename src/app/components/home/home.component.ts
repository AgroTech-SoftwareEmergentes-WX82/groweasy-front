import { Component} from '@angular/core';

import { AlertsComponent } from "../alerts/alerts.component";
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
    AlertsComponent,
    DashboardComponent
  ]

})
export class HomeComponent {


}
