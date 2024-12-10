import { CanActivateFn } from '@angular/router';

export const lazyloadAuthGuard: CanActivateFn = (route, state) => {

   const isAuthenticated = localStorage.getItem('isAuthenticated');
  if (isAuthenticated) {
    return true;
  } else {
    
    window.location.href = '/dashboard';
    return false;
  }
};