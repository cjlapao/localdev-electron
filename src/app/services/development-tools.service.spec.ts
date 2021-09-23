/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DevelopmentToolsService } from './development-tools.service';

describe('Service: DevelopmentTools', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DevelopmentToolsService]
    });
  });

  it('should ...', inject([DevelopmentToolsService], (service: DevelopmentToolsService) => {
    expect(service).toBeTruthy();
  }));
});
