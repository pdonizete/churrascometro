import { CanActivateChildFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const canActivateChildGuard: CanActivateChildFn = (childRoute, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.isLoggedIn()) {
    console.log('Acesso concedido')
    return true;
  }
  console.log('Acesso negado')
  router.navigate(['/home']);
  return false;
};
