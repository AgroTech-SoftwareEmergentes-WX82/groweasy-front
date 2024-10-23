import { Component } from '@angular/core';
import { NavbarComponent } from '../Shared/navbar/navbar.component'; // Importa el NavbarComponent

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [NavbarComponent] // Asegúrate de importar el NavbarComponent
})
export class HomeComponent {

}
