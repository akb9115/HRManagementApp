import { TestBed } from '@angular/core/testing';

import { JsonParserService } from './json-parser.service';

describe('JsonParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JsonParserService = TestBed.get(JsonParserService);
    expect(service).toBeTruthy();
  });
});
