import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);
  miSuscripcion?: Subscription;
  activeUser: boolean = false;

  isUserActivated() {
    if (window.localStorage.getItem('access_token')) {
      return true;
    }
    return false;
  }

  logOut() {
    this.authService.logOut();
  }
}
