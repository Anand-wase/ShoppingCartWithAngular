import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProductsService } from '../../products.service';
import { Product } from '../manage-products.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule,ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardContent, MatCard, MatCardTitle, MatError, FormsModule,MatButtonModule,MatDialogActions,CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProductComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<EditProductComponent>);

  private productsService = inject(ProductsService);
  private _snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
    inValidaddProductForm = false;
    editProductForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      imageUrl: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      });
  constructor(  @Inject(MAT_DIALOG_DATA) public data: any
) { 
    const product = this.productsService.getProductById(data.id);
    this.editProductForm.patchValue({
      name: product?.name,
      category: product?.category,
      description: product?.description,
      imageUrl: product?.imageUrl,
      price: product?.price? product?.price.toString() : '',
    });
}
openSnackBar() {
  this._snackBar.open('Product updated Successfully', 'Close', {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
    duration: 2000,
    panelClass: ['snackbar-success'],
  });
}

  ngOnInit() {
  }
  onEditProduct(){
    if (this.editProductForm.valid) {
      const addProductFormValue = this.editProductForm.value;
      const editProduct: Product = {
        id : this.data.id,
        name: addProductFormValue.name? addProductFormValue.name : '',
        category: addProductFormValue.category? addProductFormValue.category : '',
        description: addProductFormValue.description? addProductFormValue.description : '',
        imageUrl: addProductFormValue.imageUrl? addProductFormValue.imageUrl : '',
        price: addProductFormValue.price? parseFloat(addProductFormValue.price) : 0,
      };
      this.productsService.updateProduct(this.data.id, editProduct);
      this.editProductForm.reset();
      this.dialogRef.close();
      this.openSnackBar();
    } else {
      this.inValidaddProductForm = true;
    }
  }

}
