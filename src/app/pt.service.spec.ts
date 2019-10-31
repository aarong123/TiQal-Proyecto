import { TestBed } from '@angular/core/testing';

import { PtService } from './pt.service';

describe('PtService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PtService = TestBed.get(PtService);
    expect(service).toBeTruthy();
  });
});
