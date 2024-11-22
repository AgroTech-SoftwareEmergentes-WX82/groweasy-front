import {ChangeDetectionStrategy, Component, Input, numberAttribute} from '@angular/core';

@Component({
  selector: 'app-luminosity',
  standalone: true,
  imports: [],
  templateUrl: './luminosidad.component.html',
  styleUrl: './luminosidad.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LuminosidadComponent {

  @Input({transform: numberAttribute}) luminosity: number = 200;

}
