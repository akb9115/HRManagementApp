import { TestBed } from '@angular/core/testing';

import { EditFormBuilderService } from './edit-form-builder.service';

describe('EditFormBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditFormBuilderService = TestBed.get(EditFormBuilderService);
    expect(service).toBeTruthy();
  });
});
