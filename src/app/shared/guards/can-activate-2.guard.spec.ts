import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canActivate2Guard } from './can-activate-2.guard';

describe('canActivate2Guard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canActivate2Guard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
