import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { User } from '../login/user.model';
import { AuthService } from '../login/AuthService.service';
import { CartService } from '../products/cart/cart.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [MatToolbarModule,MatButtonModule, MatIconModule, MatBadgeModule,CommonModule,RouterLink,MatIconModule,RouterLinkActive],
})
export class NavbarComponent implements OnInit {

  private authService = inject(AuthService);
  private cartService = inject(CartService);
  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }
   get isAdmin(){
    return this.authService.getRole() === 'admin';
   }
  get currentUserName(): string | undefined {
    if (this.authService.isLoggedIn()) {    
    return this.authService.currentUser()?.username;
  };
  return undefined;
  };
  get cartCount():number | undefined{
    
    if (this.isLoggedIn) {   
    return this.cartService.quantityInCart();
    }
    return undefined;
  }
  constructor(private router: Router){
   }
  ngOnInit() {
  }
  goToCart(){
    this.router.navigate(['/user']);
  }
  onLogout(){
    this.authService.logout();
    this.router.navigate(['../login']);
  }
}
