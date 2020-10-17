import { TestBed } from '@angular/core/testing';

import { EmployeeInfoService } from './employee-info.service';

describe('EmployeeInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeInfoService = TestBed.get(EmployeeInfoService);
    expect(service).toBeTruthy();
  });
});
