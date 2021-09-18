import { TestBed } from '@angular/core/testing';

import { BaseDevelopmentToolService } from './base-development-tool.service';

describe('BaseIpcService', () => {
  let service: BaseDevelopmentToolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseDevelopmentToolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
