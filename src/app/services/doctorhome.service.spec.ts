import { TestBed } from '@angular/core/testing';

import { DoctorhomeService } from './doctorhome.service';

describe('DoctorhomeService', () => {
  let service: DoctorhomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorhomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
