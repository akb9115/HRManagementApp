import { TestBed } from '@angular/core/testing';

import { addFormBuilderService } from './add-Form-builder.service';

describe('FormBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: addFormBuilderService = TestBed.get(addFormBuilderService);
    expect(service).toBeTruthy();
  });
});
