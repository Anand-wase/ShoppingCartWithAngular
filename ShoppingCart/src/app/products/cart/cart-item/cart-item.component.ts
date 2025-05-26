import { Component, inject, Input, OnInit } from '@angular/core';
import { Product } from '../../product.model';
import { MatCardModule } from '@angular/material/card';
import { CartItem } from '../cart.model';
import { CurrencyPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
  imports: [MatCardModule, CurrencyPipe, MatIcon],
})
export class CartItemComponent implements OnInit {
  @Input({ required: true }) cartItem!: CartItem;
  private cartService = inject(CartService);
  constructor() {
   }
  
  ngOnInit() {
  }
  onAddItem() {
    this.cartService.addToCart(this.cartItem.productId);
  }
  onSubstractItem() {
    if (this.cartItem.quantity == 1)
      this.cartService.removeFromCart(this.cartItem.productId);
    else
    this.cartService.removeFromCartByOne(this.cartItem.productId);
  }
  onRemoveItem() {
    this.cartService.removeFromCart(this.cartItem.productId);
  }

}
