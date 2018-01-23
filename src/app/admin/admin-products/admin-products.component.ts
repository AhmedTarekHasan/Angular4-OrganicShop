import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProductService } from '../../models/abstractions/product-service';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  private productsSubscription: Subscription;

  constructor(private productsService: IProductService) {
    this.productsSubscription = productsService.getAll().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  public products: Product[] = [];

  ngOnInit() {
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

}
