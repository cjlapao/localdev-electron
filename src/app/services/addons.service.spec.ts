/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AddonsService } from './addons.service';

describe('Service: Addons', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddonsService]
    });
  });

  it('should ...', inject([AddonsService], (service: AddonsService) => {
    expect(service).toBeTruthy();
  }));
});
