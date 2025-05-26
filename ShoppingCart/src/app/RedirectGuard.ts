import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./login/AuthService.service";

@Injectable({ providedIn: 'root' })
export class RedirectGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}
  canActivate(): boolean {
    const loggedIn = this.authService.isLoggedIn();
    const role = this.authService.getRole();
    if (loggedIn) {
      if (role === 'admin'){
        this.router.navigate(['/manage-products']);
        return false;
      }
      else if (role === 'user') 
        this.router.navigate(['/user']);
      return false;
    }
    return true;
  }
}
