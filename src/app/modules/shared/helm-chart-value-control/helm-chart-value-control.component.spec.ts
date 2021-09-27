import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelmChartValueControlComponent } from './helm-chart-value-control.component';

describe('HelmChartValueControlComponent', () => {
  let component: HelmChartValueControlComponent;
  let fixture: ComponentFixture<HelmChartValueControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelmChartValueControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelmChartValueControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
