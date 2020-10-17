import { TestBed } from '@angular/core/testing';

import { FormOperationSupportService } from './form-operation-support.service';

describe('FormOperationSupportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormOperationSupportService = TestBed.get(FormOperationSupportService);
    expect(service).toBeTruthy();
  });
});
