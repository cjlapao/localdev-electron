import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelmChartComponent } from './helm-chart.component';

describe('HelmChartComponent', () => {
  let component: HelmChartComponent;
  let fixture: ComponentFixture<HelmChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelmChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelmChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
