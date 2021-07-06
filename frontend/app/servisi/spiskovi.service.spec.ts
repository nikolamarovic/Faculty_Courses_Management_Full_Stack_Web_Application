import { TestBed } from '@angular/core/testing';

import { SpiskoviService } from './spiskovi.service';

describe('SpiskoviService', () => {
  let service: SpiskoviService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpiskoviService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
