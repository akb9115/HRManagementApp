import { TestBed } from '@angular/core/testing';

import { FormDataToJsonService } from './form-data-to-json.service';

describe('FormDataToJsonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormDataToJsonService = TestBed.get(FormDataToJsonService);
    expect(service).toBeTruthy();
  });
});
