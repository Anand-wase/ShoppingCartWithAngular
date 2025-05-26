import { Injectable, signal } from '@angular/core';
import { ProductsService } from '../products.service';
import { UserCart } from './user-cart.model';
import { CartItem } from './cart.model';
import { AuthService } from '../../login/AuthService.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private productsService: ProductsService,
    private authService: AuthService
  ) {
    // this.userCart.set(this.getUserCart());
    // this.userCart = this.getUserCart();
  }
  userCart = signal<UserCart | null>(null);
  // userCart: UserCart | null = null;
  getUserId(): string | undefined {
    const user = this.authService.currentUser();
    if (user) {
      return user.id;
    }
    return undefined;
  }

  initializeCartAfterLogin():void{
    let userId = this.getUserId();
    if (!userId) {
      return;
    }
    const cartName: string = `userCart_${userId}`;
    const userCart = localStorage.getItem(cartName);
    // userCart? JSON.parse(userCart) : null
    this.userCart.set(userCart? JSON.parse(userCart) : null);
  }

  getUserCart(): UserCart | null {
    let userId = this.getUserId();
    if (!userId) {
      return null;
    }
    const cartName: string = `userCart_${userId}`;
    const userCart = localStorage.getItem(cartName);
    return userCart? JSON.parse(userCart) : null
    // if (userCart) {
    //   this.userCart.update(() => JSON.parse(userCart));
    //   return this.userCart();
    // }
  }

  addToCart(productId: string): void {
    let userId = this.getUserId();
    if (!userId) {
      return;
    }
    const cartName: string = `userCart_${userId}`;
    const storedUserCart: UserCart | null = this.userCart();
    const product = this.productsService.getProductById(productId);
    if (storedUserCart) {
      const productExists = storedUserCart.cartList.some(
        (product) => product.productId === productId
      );
      if (productExists) {
        let updatedCartList: CartItem[] = storedUserCart.cartList.map(
          (cart) => {
            if (cart.productId === productId) {
              cart.quantity += 1;
            }
            return cart;
          }
        );
        storedUserCart.cartList = updatedCartList;
        storedUserCart.totalPrice +=
          storedUserCart.cartList.find(
            (product) => product.productId === productId
          )?.price || 0;
          storedUserCart.totalPrice = Number(storedUserCart.totalPrice.toFixed(2));
        storedUserCart.totalItems+=1
      } else {
        if (product) {
          let newCartItem: CartItem = {
            productId: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            category: product.category,
            totalPrice: Number(product.price.toFixed(2)),
            quantity: 1,
          };
          storedUserCart.cartList.push(newCartItem);
          storedUserCart.totalPrice += newCartItem.price;
          storedUserCart.totalPrice = Number(storedUserCart.totalPrice.toFixed(2))
          storedUserCart.totalItems += 1;
        }
      }
      localStorage.setItem(cartName, JSON.stringify(storedUserCart));
      this.userCart.update(() => storedUserCart);
      // this.userCart = storedUserCart;
    } else {
      let newCartItem: CartItem = {
        productId: productId,
        name: product?.name || '',
        price: product?.price || 0,
        imageUrl: product?.imageUrl || '',
        category: product?.category || '',
        totalPrice: product?.price || 0,
        quantity: 1,
      };
      let newCart: UserCart = {
        userId: userId,
        cartList: [newCartItem],
        totalPrice: newCartItem.totalPrice,
        totalItems: 1,
      };
      localStorage.setItem(cartName, JSON.stringify(newCart));
      this.userCart.update(() => newCart);
      // this.userCart = newCart
    }
  }
  removeFromCart(productId: string): void {
    const countOfItems = this.userCart()?.cartList.length;
    if (countOfItems && countOfItems==1){
      this.checkOut();
      return;
    }
    let userId = this.getUserId();
    if (!userId) {
      return;
    }
    const cartName: string = `userCart_${userId}`;
    const userCartValue: UserCart | null = this.userCart();
    if (userCartValue) {
      const productIndex = userCartValue.cartList.findIndex(
        (product) => product.productId === productId
      );
      if (productIndex !== -1) {
        userCartValue.totalPrice -=
          userCartValue.cartList[productIndex].price*userCartValue.cartList[productIndex].quantity;
        userCartValue.totalPrice = Number(userCartValue.totalPrice.toFixed(2));
          userCartValue.totalItems -= userCartValue.cartList[productIndex].quantity;
        userCartValue.cartList=userCartValue.cartList.filter(cart => cart.productId!==userCartValue.cartList[productIndex].productId);
        localStorage.setItem(cartName, JSON.stringify(userCartValue));
        this.userCart.update(()=>userCartValue);
        // this.userCart = userCartValue
      }
    }
  }
  removeFromCartByOne(productId: string): void {
    let userId = this.getUserId();
    if (!userId) {
      return;
    }
    const cartName: string = `userCart_${userId}`;
    const userCartValue: UserCart | null = this.userCart();
    if (userCartValue) {
      const productIndex = userCartValue.cartList.findIndex(
        (product) => product.productId === productId
      );
      if (productIndex !== -1) {
        userCartValue.cartList[productIndex].quantity -= 1;
        userCartValue.cartList[productIndex].totalPrice -=
          userCartValue.cartList[productIndex].price;
          userCartValue.totalItems-=1
        userCartValue.totalPrice -= userCartValue.cartList[productIndex].price;
        userCartValue.totalPrice = Number(userCartValue.totalPrice.toFixed(2));
        localStorage.setItem(cartName, JSON.stringify(userCartValue));
        this.userCart.update(() => userCartValue);
        // this.userCart = userCartValue
      }
    }
  }

  quantityInCart(): number {
    let userId = this.getUserId();
    if (!userId) {
      return 0;
    }
    const userCartValue: UserCart | null = this.userCart();
    if (userCartValue) {
      return userCartValue.cartList.reduce(
        (total, product) => total + product.quantity,
        0
      );
    }
    return 0;
  }
  checkOut(): void {
    let userId = this.getUserId();
    if (!userId) {
      return;
    }
    const cartName: string = `userCart_${userId}`;
    localStorage.removeItem(cartName);
    this.userCart.update(() => null);
    // this.userCart = null;
  }
}
