import { CanActivateFn } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/api';


export const AuthGuardService: CanActivateFn = () => {
  const isAuthenticated = inject(AuthService).isAuthenticated();
  const router = inject(Router);
  if (isAuthenticated) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
