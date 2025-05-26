import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CartService } from '../cart.service';
import { UserCart } from '../user-cart.model';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.component.html',
  styleUrls: ['./cart-checkout.component.css'],
  imports: [MatDialogModule, MatButtonModule, MatCardModule, MatListModule, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class CartCheckoutComponent implements OnInit {
  private cartService = inject(CartService);
  userCart: UserCart | null = this.cartService.getUserCart();
  private dialogRef = inject(MatDialogRef<CartCheckoutComponent>);
  private _snackBar = inject(MatSnackBar);
  private router = inject(Router);
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  get totalPrice(): number {
    if (this.userCart)
      return this.userCart.cartList.reduce((total, item) => total + (item.price * item.quantity), 0);
    return 0
    }
    openSnackBar() {
      this._snackBar.open('Order placed Successfully', 'Close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 2000,
        panelClass: ['snackbar-success'],
      });
    }
    onCheckOut(){
      this.cartService.checkOut();
      this.userCart = null;
      this.dialogRef.close();
      this.router.navigate(['/products']);
      this.openSnackBar();
    }
  constructor() {
  }
  ngOnInit() {
  }

}
