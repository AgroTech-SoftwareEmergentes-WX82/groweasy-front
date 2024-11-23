import {ChangeDetectionStrategy, Component, Input, numberAttribute} from '@angular/core';

@Component({
  selector: 'app-temperature',
  standalone: true,
  imports: [],
  templateUrl: './temperatura.component.html',
  styleUrl: './temperatura.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemperaturaComponent {

  @Input({transform: numberAttribute}) temperature: number = 0;

  get temperaturePercentage(): number {
    return (this.temperature / 100) * 100;
  }

}
