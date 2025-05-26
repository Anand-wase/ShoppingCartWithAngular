import { CartItem } from "./cart.model";

export interface UserCart {
  userId: string;
  cartList: CartItem[];
  totalPrice: number;
  totalItems: number;
}
