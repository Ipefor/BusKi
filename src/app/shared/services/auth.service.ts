import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly router = inject(Router);
  public provider = new GoogleAuthProvider();
  public auth = getAuth();

  public userName: string | undefined;

  constructor() {
    this.userName = window.localStorage.getItem('user_name') || undefined;
  }

  login(): void {
    signInWithPopup(this.auth, this.provider).then((result: any) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      if (token) {
        window.localStorage.setItem('access_token', token);
      }
      const user = result.user;
      this.userName = user.displayName;
      if (this.userName) {
        window.localStorage.setItem('user_name', this.userName);
      }
      this.router.navigate(['/chat']);
    });
  }

  logOut(): void {
    signOut(this.auth).then(() => {
      window.localStorage.clear();
      this.userName = undefined;
      this.router.navigate(['/login']);
    });
  }
}
