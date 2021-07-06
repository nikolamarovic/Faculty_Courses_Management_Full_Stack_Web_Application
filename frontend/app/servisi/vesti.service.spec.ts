import { TestBed } from '@angular/core/testing';

import { VestiService } from './vesti.service';

describe('VestiService', () => {
  let service: VestiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VestiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
