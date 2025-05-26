import { Injectable, signal } from '@angular/core';
import { Product } from './product.model';
import { NewProductData } from './NewProductData.Modal';
import { DUMMY_PRODUCTS } from '../DUMMY_DATA/DUMMY_PRODUCTS';

// import * as fs from 'fs';

export const products: Product[] = [];
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      this.products.set(JSON.parse(storedProducts));
    } else {
      this.products.set(DUMMY_PRODUCTS);
      localStorage.setItem('products', JSON.stringify(DUMMY_PRODUCTS));
    }
  }

  products = signal<Product[]>([]);
  
  allProducts = this.products.asReadonly();
  
  getProductByCategory(category: string) {
    return this.products().filter(product => product.category === category);
  }

  getProductById(id: string) {
    return this.products().find(product => product.id === id);
  }
  addProduct(product: NewProductData) {
    let newProduct: Product = {
      id: new Date().getTime().toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category
    }
    // this.products.update((products) => [...products, newProduct]);
    this.products.set([...this.products(), newProduct]);
    this.saveProduct();
  }

  deleteProduct(id: string) {
    this.products.update((products) => products.filter(product => product.id !== id));
    this.saveProduct();
  }
  updateProduct(id: string, updatedProduct: Product) {
    this.products.update((products) => products.map(product=>product.id === id ? updatedProduct : product
    ));
    this.saveProduct();
  }

  getProductsBySearchTerm(searchTerm: string) {
    return this.products().filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  getCartItems(username: string) {
    const cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems)[username] : [];
  }

  private saveProduct() {
    localStorage.setItem('products', JSON.stringify(this.products()));
  }



}
