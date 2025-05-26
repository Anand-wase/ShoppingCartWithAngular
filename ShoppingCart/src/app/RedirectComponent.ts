import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './login/AuthService.service';

@Component({
  selector: 'app-redirect',
  template: '' // Empty template
})
export class RedirectComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit() {
    const isLoggedIn = this.authService.isLoggedIn();
    const userRole = this.authService.getRole();
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
    } else if (userRole.toUpperCase() === 'ADMIN') {
      this.router.navigate(['/manage-products']);
    } else {
      this.router.navigate(['/products']);
    }
  }
}
