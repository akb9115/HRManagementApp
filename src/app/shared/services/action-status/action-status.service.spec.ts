import { TestBed } from '@angular/core/testing';

import { ActionStatusService } from './action-status.service';

describe('ActionStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActionStatusService = TestBed.get(ActionStatusService);
    expect(service).toBeTruthy();
  });
});
