import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NewProductData } from '../../NewProductData.Modal';
import { ProductsService } from '../../products.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule,ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardContent, MatCard, MatCardTitle, MatError, FormsModule,MatButtonModule,MatDialogActions,CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProductDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<AddProductDialogComponent>);
  private productsService = inject(ProductsService);
  private _snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
    inValidaddProductForm = false;
    addProductForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      imageUrl: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      });
  constructor() { }

  ngOnInit() {
  }
  openSnackBar() {
    this._snackBar.open('Product added Successfully', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000,
      panelClass: ['snackbar-success'],
    });
  }

  onAddProduct(){
    if (this.addProductForm.valid) {
      const addProductFormValue = this.addProductForm.value;
      const newProduct: NewProductData = {
        name: addProductFormValue.name? addProductFormValue.name : '',
        category: addProductFormValue.category? addProductFormValue.category : '',
        description: addProductFormValue.description? addProductFormValue.description : '',
        imageUrl: addProductFormValue.imageUrl? addProductFormValue.imageUrl : '',
        price: addProductFormValue.price? parseFloat(addProductFormValue.price) : 0,
      };
      this.productsService.addProduct(newProduct);
      this.addProductForm.reset();
      this.dialogRef.close();
      this.openSnackBar();
    } else {
      this.inValidaddProductForm = true;
    }
  }

}
