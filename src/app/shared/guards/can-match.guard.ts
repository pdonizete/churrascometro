import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { LoginService } from '../services/login.service';

export const canMatchGuard: CanMatchFn = (route, segments) => {
  const serviceLogin = inject(LoginService);

  if (serviceLogin.isAdmin()) {
    console.log('Acesso permitido');
    return true;
  }

  console.log('Acesso negado');
  return false;
};
