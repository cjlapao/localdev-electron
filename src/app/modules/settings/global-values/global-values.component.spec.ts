import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalValuesComponent } from './global-values.component';

describe('GlobalValuesComponent', () => {
  let component: GlobalValuesComponent;
  let fixture: ComponentFixture<GlobalValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalValuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
