import { TestBed } from '@angular/core/testing';

import { FilterDataService } from './filter-data.service';

describe('DepartmentFilterDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterDataService = TestBed.get(FilterDataService);
    expect(service).toBeTruthy();
  });
});
