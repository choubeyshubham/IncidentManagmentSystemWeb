// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // For example, store a token or a boolean here
  private loggedIn = false;

  constructor() {}

  public isLoggedIn(): boolean {
    // In a real app, you might check localStorage or token expiry, etc.
    return this.loggedIn;
  }

  public login(): void {
    // Call API, validate user, etc., then set:
    this.loggedIn = true;
  }

  public logout(): void {
    this.loggedIn = false;
  }
}
