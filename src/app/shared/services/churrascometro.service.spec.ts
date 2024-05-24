import { TestBed } from '@angular/core/testing';

import { ChurrascometroService } from './churrascometro.service';

describe('ChurrascometroService', () => {
  let service: ChurrascometroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChurrascometroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
