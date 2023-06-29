import { TestBed } from '@angular/core/testing';

import { ResidentesService } from './residentes.service';

describe('ResidentesService', () => {
  let service: ResidentesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResidentesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
