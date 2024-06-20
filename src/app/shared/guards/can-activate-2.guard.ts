import { CanActivateFn } from '@angular/router';

export const canActivate2Guard: CanActivateFn = (route, state) => {
  return true;
};
