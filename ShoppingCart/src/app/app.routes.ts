import { Routes } from '@angular/router';
// import { RedirectGuard } from './RedirectGuard';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './products/cart/cart.component';
import { RedirectGuard } from './RedirectGuard';
import { AuthGuard } from './AuthGuard';
import { ManageProductsComponent } from './products/manage-products/manage-products.component';
import { RedirectComponent } from './RedirectComponent';
import { RoleGuard } from './RoleGuard';


export const routes: Routes = [
  {
    path: '',
    component: RedirectComponent,
  },
  { path: 'login',
     component: LoginComponent,
      canActivate: [RedirectGuard],
  },
  { path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'user' }

  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'user' }

  },
  {
    path: 'manage-products',
    component: ManageProductsComponent,
    canActivate: [AuthGuard, RoleGuard], 
    data: { expectedRole: 'admin' }
  },
  { path: '**', redirectTo: '' }
];
