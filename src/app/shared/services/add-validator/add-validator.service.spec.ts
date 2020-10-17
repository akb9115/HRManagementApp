import { TestBed } from '@angular/core/testing';

import { AddValidatorService } from './add-validator.service';

describe('AddValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddValidatorService = TestBed.get(AddValidatorService);
    expect(service).toBeTruthy();
  });
});
