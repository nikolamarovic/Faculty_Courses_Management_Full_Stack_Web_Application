import { TestBed } from '@angular/core/testing';

import { PredmetiService } from './predmeti.service';

describe('PredmetiService', () => {
  let service: PredmetiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PredmetiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
