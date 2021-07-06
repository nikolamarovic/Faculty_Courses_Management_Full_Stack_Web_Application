import { TestBed } from '@angular/core/testing';

import { FajloviService } from './fajlovi.service';

describe('FajloviService', () => {
  let service: FajloviService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FajloviService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
