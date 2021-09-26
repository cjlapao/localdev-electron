import { TestBed } from '@angular/core/testing';

import { ExtrasKubernetesAddonsService } from './extras-kubernetes-addons.service';

describe('ExtrasKubernetesAddonsService', () => {
  let service: ExtrasKubernetesAddonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtrasKubernetesAddonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
