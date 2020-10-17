import { TestBed } from '@angular/core/testing';

import { DisableEmployeeService } from './disable-employee.service';

describe('DisableEmployeeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DisableEmployeeService = TestBed.get(DisableEmployeeService);
    expect(service).toBeTruthy();
  });
});
