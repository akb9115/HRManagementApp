import { TestBed } from '@angular/core/testing';

import { ApiResolverService } from './api-resolver.service';

describe('ApiResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiResolverService = TestBed.get(ApiResolverService);
    expect(service).toBeTruthy();
  });
});
