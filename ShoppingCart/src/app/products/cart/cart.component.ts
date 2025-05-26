import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CartItemComponent } from "./cart-item/cart-item.component";
import { ProductsService } from '../products.service';
import { Product } from '../product.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { CartService } from './cart.service';
import { MatDialog } from '@angular/material/dialog';
import { CartCheckoutComponent } from './cart-checkout/cart-checkout.component';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';
import { EmptyCartComponent } from "./empty-cart/empty-cart.component";
import { UserCart } from './user-cart.model';
import { CartItem } from './cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [MatCardModule, CartItemComponent, MatGridListModule, MatButtonModule, CurrencyPipe, EmptyCartComponent]
})
export class CartComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  private productsService = inject(ProductsService);
  private cartService = inject(CartService);
  products: Product[] = this.productsService.allProducts();
  cart: CartItem[] | undefined;

  get userCart():CartItem[] | null{
    let cart:CartItem[] | undefined;
    cart  = this.cartService.userCart()?.cartList;
    return cart? cart:[]
  }

  get totalPrice(): number {
    if (this.userCart)
      return this.userCart?.reduce((total, item) => total + (item.price * item.quantity), 0);
    return 0
    }

  constructor() { 
  }

  ngOnInit() {
  }
  onCheckout() {
    const dialogRef = this.dialog.open(CartCheckoutComponent);

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
