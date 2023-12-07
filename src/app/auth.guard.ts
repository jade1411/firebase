import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  const user = JSON.parse(localStorage.getItem('user')!);
  if (!user) {
    return router.createUrlTree(['/', 'login']);
  } else if (!user.emailVerified) {
    return router.createUrlTree(['/', 'registration', 'mail-verification']);
  }
  return true;
};