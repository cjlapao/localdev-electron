import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelmChartValueComponent } from './helm-chart-value.component';

describe('HelmChartValueComponent', () => {
  let component: HelmChartValueComponent;
  let fixture: ComponentFixture<HelmChartValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelmChartValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelmChartValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
