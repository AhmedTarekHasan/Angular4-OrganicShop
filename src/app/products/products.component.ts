import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProductService } from '../models/abstractions/product-service';
import { Product } from '../models/product';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../models/category';
import { IShoppingCartService } from '../models/abstractions/shopping-cart-service';
import { ShoppingCartReport, ProductPurchaseRecord } from '../models/abstractions/shopping-cart';
import { LiteEventHandler } from '../shared/lite-event';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  private productsSubscription: Subscription;
  private onItemAddedHandler: LiteEventHandler<Product>;
  private onItemRemovedHandler: LiteEventHandler<Product>;
  private onItemsClearedHandler: LiteEventHandler<void>;
  private shoppingCartService: IShoppingCartService;
  
  public productPurchaseRecords: ProductPurchaseRecord[] = [];
  public filteredProductPurchaseRecords: ProductPurchaseRecord[] = [];
  public selectedCategoryId: string = '-1';

  constructor(private productService: IProductService,
    private router: Router,
    private route: ActivatedRoute) {
      this.shoppingCartService = AppComponent.globalShoppingCartService;

      this.productsSubscription = this.productService.getAll().subscribe((products: Product[]) => {
        this.productPurchaseRecords = products.sort(this.sortProducts).map((value, index, array) => {
          let productPurchaseRecord = new  ProductPurchaseRecord();
          productPurchaseRecord.product = value;
          productPurchaseRecord.productItemsCount = this.getProductItemsCount(value);
          return productPurchaseRecord;
        });

        this.route.queryParamMap.subscribe(params => {
          if(params.get('category')) {
            this.selectedCategoryId = params.get('category');
            this.filterByCategoryId(params.get('category'));
          } else {
            this.selectedCategoryId = '-1';
            this.filterByCategoryId("-1");
          }
        });
      });

      this.onItemAddedHandler = this.shoppingCartService.itemAdded.on((product: Product) => {
        let foundProduct = this.productPurchaseRecords.find((value, index, arr) => {
          return value.product === product;
        });

        if(foundProduct) {
          foundProduct.productItemsCount++;
        }
      });

      this.onItemRemovedHandler = this.shoppingCartService.itemRemoved.on((product: Product) => {
        let foundProduct = this.productPurchaseRecords.find((value, index, arr) => {
          return value.product === product;
        });

        if(foundProduct) {
          foundProduct.productItemsCount--;
        }
      });

      this.onItemsClearedHandler = this.shoppingCartService.itemsCleared.on(() => {
        this.productPurchaseRecords.forEach((value, index, array) => {
          value.productItemsCount = 0;
        });
      });
  }

  public filterByCategoryId(categoryId: string): void {
    if(categoryId != "-1") {
      this.filteredProductPurchaseRecords = this.productPurchaseRecords.filter((productPurchaseRecord, index, arr) => {
        return productPurchaseRecord.product.categoryId === categoryId;
      });
    } else {
      this.filteredProductPurchaseRecords = this.productPurchaseRecords;
    }
  }
  public onSelectedCategoryIdChanged(categoryId: string) {
    this.selectedCategoryId = categoryId;
    this.router.navigate(['/'], { queryParams: { 'category': categoryId } });
  }
  public onProductItemAdded(product: Product): void {
    this.shoppingCartService.addProductItem(product);
  }
  public onProductItemRemoved(product: Product): void {
    this.shoppingCartService.removeProductItem(product);
  }
  public getProductItemsCount(product: Product): number {
    return this.shoppingCartService.getProductItemsCount(product);
  }

  private sortProducts(a: Product, b: Product): number {
    let result = 0;
    const left = a.title;
    const right = b.title;

    if(left > right) {
      result = 1;
    } else if(left < right) {
      result = -1;
    }

    return result;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if(this.productsSubscription) this.productsSubscription.unsubscribe();
    if(this.onItemAddedHandler) this.onItemAddedHandler.off();
    if(this.onItemRemovedHandler) this.onItemRemovedHandler.off();
    if(this.onItemsClearedHandler) this.onItemsClearedHandler.off();
  }

}
