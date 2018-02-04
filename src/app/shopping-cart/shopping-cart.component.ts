import { Component, OnInit, OnDestroy } from '@angular/core';
import { IShoppingCartService } from '../models/abstractions/shopping-cart-service';
import { ShoppingCartReport } from '../models/abstractions/shopping-cart';
import { LiteEventHandler } from './../shared/lite-event';
import { AppComponent } from '../app.component';
import { Product } from '../models/product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  private onItemsCountUpdatedEventHandler: LiteEventHandler<number>;
  private shoppingCartService: IShoppingCartService;
  
  public totalItemsCount: number = 0;
  public totalItemsPrice: number = 0;
  public report: ShoppingCartReport = <ShoppingCartReport>{};

  constructor() {
    this.shoppingCartService = AppComponent.globalShoppingCartService;
    this.updateView();

    this.onItemsCountUpdatedEventHandler = this.shoppingCartService.itemsCountUpdated.on(() => {
      this.updateView();
    });
  }

  public onProductItemAdded(product: Product): void {
    this.shoppingCartService.addProductItem(product);
  }
  public onProductItemRemoved(product: Product): void {
    this.shoppingCartService.removeProductItem(product);
  }
  public clearShoppingCart():void {
    this.shoppingCartService.clear();
  }

  private updateView(): void {
    this.totalItemsCount = this.shoppingCartService.totalCount;
    this.totalItemsPrice = this.shoppingCartService.totalPrice;
    this.report = this.shoppingCartService.report;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if(this.onItemsCountUpdatedEventHandler) this.onItemsCountUpdatedEventHandler.off();
  }
}
