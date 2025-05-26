import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, inject, NgModule, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { User } from './user.model';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from './AuthService.service';
import { DUMMY_USERS } from '../DUMMY_DATA/DUMMY_USERS';
import { CartService } from '../products/cart/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardContent, MatCard, MatCardTitle, MatError, FormsModule,CommonModule,MatIcon],
})
export class LoginComponent implements OnInit {
  hide = signal(true);
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  clickVisibility(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  inValidLogin = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    constructor(private router: Router){}

  ngOnInit() {
  }
  onSubmit() {
    let isLoginSuccessful = this.authService.isLoginSuccessful(this.loginForm.value.email , this.loginForm.value.password)
      if (isLoginSuccessful) {
        this.cartService.initializeCartAfterLogin();
        this.router.navigate(['~/']);
      }
      else{
        this.inValidLogin = true;
      }
    }
}
