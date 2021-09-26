import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultExtrasComponent } from './default-extras.component';

describe('DefaultExtrasComponent', () => {
  let component: DefaultExtrasComponent;
  let fixture: ComponentFixture<DefaultExtrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultExtrasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
