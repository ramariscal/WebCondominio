import { TestBed } from '@angular/core/testing';

import { AllinsformesService } from './allinsformes.service';

describe('AllinsformesService', () => {
  let service: AllinsformesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllinsformesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
