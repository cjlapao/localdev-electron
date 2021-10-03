import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperActionsComponent } from './developer-actions.component';

describe('DeveloperActionsComponent', () => {
  let component: DeveloperActionsComponent;
  let fixture: ComponentFixture<DeveloperActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeveloperActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
