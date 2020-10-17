import { TestBed } from '@angular/core/testing';

import { EditEmpService } from './edit-emp.service';

describe('EditEmpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditEmpService = TestBed.get(EditEmpService);
    expect(service).toBeTruthy();
  });
});
