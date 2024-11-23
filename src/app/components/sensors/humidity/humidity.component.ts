import {ChangeDetectionStrategy, Component, Input, numberAttribute} from '@angular/core';
import {KnobModule} from 'primeng/knob';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-humidity',
  standalone: true,
  imports: [
    KnobModule,
    FormsModule
  ],
  templateUrl: './humidity.component.html',
  styleUrl: './humidity.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HumidityComponent {

  @Input({transform: numberAttribute}) humidity: number = 0;


}
