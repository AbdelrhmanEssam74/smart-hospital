import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loginRegisterGuard } from './login-register.guard';

describe('loginRegisterGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loginRegisterGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
