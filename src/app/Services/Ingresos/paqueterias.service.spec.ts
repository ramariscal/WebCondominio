import { TestBed } from '@angular/core/testing';

import { PaqueteriasService } from './paqueterias.service';

describe('PaqueteriasService', () => {
  let service: PaqueteriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaqueteriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
