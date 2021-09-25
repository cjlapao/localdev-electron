import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultAddonsComponent } from './default-addons.component';

describe('DefaultAddonsComponent', () => {
  let component: DefaultAddonsComponent;
  let fixture: ComponentFixture<DefaultAddonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultAddonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultAddonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
