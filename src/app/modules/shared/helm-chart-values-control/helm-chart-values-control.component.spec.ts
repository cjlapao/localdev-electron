import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelmChartValuesControlComponent } from './helm-chart-values-control.component';

describe('HelmChartValueControlComponent', () => {
  let component: HelmChartValuesControlComponent;
  let fixture: ComponentFixture<HelmChartValuesControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelmChartValuesControlComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelmChartValuesControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
