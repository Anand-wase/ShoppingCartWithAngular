import { ChangeDetectionStrategy, Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ProductsService } from '../products.service';
// import { Product } from '../product.model';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddProductDialogComponent } from './add-product/add-product.component';
import { MatIcon } from '@angular/material/icon';
import { EditProductComponent } from './edit-product/edit-product.component';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CurrencyPipe, NgClass } from '@angular/common';
import { MatInputModule } from '@angular/material/input';


export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}
@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css'],
  imports: [MatButtonModule, MatTableModule,MatIcon,MatSortModule,MatFormFieldModule,MatPaginatorModule, MatPaginator,NgClass,MatInputModule,CurrencyPipe],
})
export class ManageProductsComponent implements OnInit {
  private prodcutsService = inject(ProductsService);
  private _snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = ['name', 'price', 'imageUrl', 'category','actions'];
  dataSource = new MatTableDataSource<Product>();
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

      ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
  get products(){
    let products = this.prodcutsService.products();
    return products;
  } 
  products1 = signal<any>(null);
  constructor() {
    this.products1.set(this.prodcutsService.products())
    this.dataSource.data = this.products1();
   }
  readonly dialog = inject(MatDialog);
  addProductDialog(){
        this.dialog.open(AddProductDialogComponent);
        this.dialog.afterAllClosed.subscribe(() => {
            this.dataSource.data = this.products;
        });
      }
  onDeleteProduct(id: string) {
    this.prodcutsService.deleteProduct(id);
    this.dataSource.data = this.products;
    this.openSnackBar();
  }
  onEditProduct(id: string) {
    this.dialog.open(EditProductComponent, { data : {id: id} });
    this.dialog.afterAllClosed.subscribe(()=>{
      this.dataSource.data = this.products;
    })
  }

  ngOnInit() {
  }
  openSnackBar() {
    this._snackBar.open('Product removesd Successfully', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 1000,
      panelClass: ['snackbar-success'],
    });
  }
  applyFilter(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataSource.data = this.prodcutsService.getProductsBySearchTerm(searchTerm)
  }
}