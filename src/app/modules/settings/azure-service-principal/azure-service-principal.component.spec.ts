import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzureServicePrincipalComponent } from './azure-service-principal.component';

describe('AzureServicePrincipalComponent', () => {
  let component: AzureServicePrincipalComponent;
  let fixture: ComponentFixture<AzureServicePrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzureServicePrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AzureServicePrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
