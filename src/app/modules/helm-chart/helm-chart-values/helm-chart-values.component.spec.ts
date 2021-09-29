import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelmChartValuesComponent } from './helm-chart-values.component';

describe('HelmChartValuesComponent', () => {
  let component: HelmChartValuesComponent;
  let fixture: ComponentFixture<HelmChartValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelmChartValuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelmChartValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
