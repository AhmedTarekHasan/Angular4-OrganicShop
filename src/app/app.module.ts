import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { DataTableModule } from 'angular5-data-table';

import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { UserService } from './user.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './category.service';
import { ProductService } from './product.service';
import { IProductService } from './models/abstractions/product-service';
import { ICategoryService } from './models/abstractions/category-service';
import { IUserService } from './models/abstractions/user-service';
import { IAuthService } from './models/abstractions/auth-service';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ShoppingCartItemsControllerComponent } from './shopping-cart-items-controller/shopping-cart-items-controller.component';
import { IShoppingCart } from './models/abstractions/shopping-cart';
import { ShoppingCart } from './models/shopping-cart';
import { IShoppingCartService } from './models/abstractions/shopping-cart-service';
import { ShoppingCartService } from './shopping-cart.service';
import { IStorage } from './models/abstractions/storage';
import { LocalStorage } from './models/local-storage';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ShoppingCartItemsControllerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    Angular2FontawesomeModule,
    DataTableModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
    [
      {
        path: '',
        component: ProductsComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'shopping-cart',
        component: ShoppingCartComponent
      },
      {
        path: 'check-out',
        component: CheckOutComponent,
        canActivate: [ AuthGuardService ]
      },
      {
        path: 'order-success',
        component: OrderSuccessComponent,
        canActivate: [ AuthGuardService ]
      },
      {
        path: 'my/orders',
        component: MyOrdersComponent,
        canActivate: [ AuthGuardService ]
      },
      {
        path: 'admin/products/new',
        component: ProductFormComponent,
        canActivate: [ AuthGuardService, AdminAuthGuardService ]
      },
      {
        path: 'admin/products/:id',
        component: ProductFormComponent,
        canActivate: [ AuthGuardService, AdminAuthGuardService ]
      },
      {
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [ AuthGuardService, AdminAuthGuardService ]
      },
      {
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: [ AuthGuardService, AdminAuthGuardService ]
      }
    ])
  ],
  providers: [
    AuthGuardService,
    AdminAuthGuardService,
    { provide: IAuthService, useClass: AuthService },
    { provide: IProductService, useClass: ProductService },
    { provide: ICategoryService, useClass: CategoryService },
    { provide: IUserService, useClass: UserService },
    { provide: IStorage, useClass: LocalStorage },
    { provide: IShoppingCart, useClass: ShoppingCart },
    { provide: IShoppingCartService, useClass: ShoppingCartService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
