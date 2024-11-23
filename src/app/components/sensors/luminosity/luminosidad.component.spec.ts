import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuminosidadComponent } from './luminosidad.component';

describe('LuminosidadComponent', () => {
  let component: LuminosidadComponent;
  let fixture: ComponentFixture<LuminosidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LuminosidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LuminosidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
