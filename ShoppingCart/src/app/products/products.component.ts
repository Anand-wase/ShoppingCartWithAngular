import { Component, inject, OnInit } from '@angular/core';
import { ProductComponent } from "./product/product.component";
import { MatGridListModule } from '@angular/material/grid-list';
import { Product } from './product.model';
import { ProductsService } from './products.service';
import { MatIcon } from '@angular/material/icon';
import { EmptyProductsComponent } from "./empty-products/empty-products.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [MatGridListModule, ProductComponent, MatIcon, EmptyProductsComponent]
})
export class ProductsComponent implements OnInit {
  private productsService = inject(ProductsService);
  products: Product[] = this.productsService.products();
  ngOnInit() {
  }

  applyFilter(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.products= this.productsService.getProductsBySearchTerm(searchTerm)
  }

}
