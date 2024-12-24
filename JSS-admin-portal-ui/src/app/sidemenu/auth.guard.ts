import { CanActivateFn, Router } from '@angular/router';

import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Injecting the Router
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'; // Check authentication status

  if (isAuthenticated) {
    return true; // Allow access to the route
  } else {
    router.navigate(['/auth/login']); // Redirect to login if not authenticated
    return false; // Block access to the route
  }
};

