import { TestBed } from '@angular/core/testing';

import { DeleteEmployeeService } from './delete-employee.service';

describe('DeleteEmployeeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeleteEmployeeService = TestBed.get(DeleteEmployeeService);
    expect(service).toBeTruthy();
  });
});
