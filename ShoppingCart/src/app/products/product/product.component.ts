import { Component, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../product.model';
import { CartService } from '../cart/cart.service';
import { AuthService } from '../../login/AuthService.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  imports: [MatCardModule, MatButtonModule, CurrencyPipe],
  providers: [MatTableDataSource],
})
export class ProductComponent implements OnInit {
  @Input({ required: true }) product!: Product;
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  constructor() { }

  ngOnInit() {
  }
  addItemToCart(){
    if (this.authService.isLoggedIn()) {
      this.cartService.addToCart(this.product.id);
    }
  }
}
