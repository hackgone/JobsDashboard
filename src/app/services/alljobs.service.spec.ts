import { TestBed } from '@angular/core/testing';

import { AlljobsService } from './alljobs.service';

describe('AlljobsService', () => {
  let service: AlljobsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlljobsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
