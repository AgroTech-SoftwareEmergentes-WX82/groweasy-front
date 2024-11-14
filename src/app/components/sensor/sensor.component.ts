import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {ValueSensor} from '../../core/model/valueSensor.model';
import {DecimalPipe, NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';
import {ProgressBarModule} from 'primeng/progressbar';

@Component({
  selector: 'app-sensor',
  standalone: true,
  imports: [
    NgSwitchCase,
    ProgressBarModule,
    DecimalPipe,
    NgSwitch,
    NgSwitchDefault
  ],
  templateUrl: './sensor.component.html',
  styleUrl: './sensor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SensorComponent {
  @Input() sensorData!: ValueSensor;
}
