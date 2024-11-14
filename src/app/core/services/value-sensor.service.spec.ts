import { TestBed } from '@angular/core/testing';

import { ValueSensorService } from './value-sensor.service';

describe('ValueSensorService', () => {
  let service: ValueSensorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValueSensorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
