import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { ProductsComponent } from "./products/products.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { CartComponent } from "./products/cart/cart.component";
import { CartService } from './products/cart/cart.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'ShoppingCart';
  private cartService = inject(CartService);
  constructor(){
  }
}
