import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumidityDashboardComponent } from './humidity-dashboard.component';

describe('HumidityDashboardComponent', () => {
  let component: HumidityDashboardComponent;
  let fixture: ComponentFixture<HumidityDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HumidityDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HumidityDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
