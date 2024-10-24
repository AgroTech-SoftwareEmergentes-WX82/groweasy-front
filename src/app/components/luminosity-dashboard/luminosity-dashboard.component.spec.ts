import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuminosityDashboardComponent } from './luminosity-dashboard.component';

describe('LuminosityDashboardComponent', () => {
  let component: LuminosityDashboardComponent;
  let fixture: ComponentFixture<LuminosityDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LuminosityDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LuminosityDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
