import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperActionComponent } from './developer-action.component';

describe('DeveloperActionComponent', () => {
  let component: DeveloperActionComponent;
  let fixture: ComponentFixture<DeveloperActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeveloperActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
