import { TestBed } from '@angular/core/testing';

import { ObavestenjaService } from './obavestenja.service';

describe('ObavestenjaService', () => {
  let service: ObavestenjaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObavestenjaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
