import { TestBed } from '@angular/core/testing';

import { HardCodedDataForFormService } from './hard-coded-data-for-form.service';

describe('HardCodedDataForFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HardCodedDataForFormService = TestBed.get(HardCodedDataForFormService);
    expect(service).toBeTruthy();
  });
});
