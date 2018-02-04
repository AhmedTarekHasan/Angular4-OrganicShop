import { Injectable, Inject, forwardRef } from '@angular/core';
import { IShoppingCartService } from './models/abstractions/shopping-cart-service';
import { IShoppingCart, ShoppingCartReport } from './models/abstractions/shopping-cart';
import { Product } from './models/product';
import { ShoppingCart } from './models/shopping-cart';
import { ILiteEvent, LiteEvent } from './shared/lite-event';
import { IStorage } from './models/abstractions/storage';

@Injectable()
export class ShoppingCartService extends IShoppingCartService {
  private readonly onItemAdded = new LiteEvent<Product>();
  private readonly onItemRemoved = new LiteEvent<Product>();
  private readonly onItemsCleared = new LiteEvent<void>();
  private readonly onItemsCountUpdated= new LiteEvent<number>();
  
  private get shoppintCart(): IShoppingCart {
    let cart: IShoppingCart = null;
    let saved = JSON.parse(this.storage.getItem('OrganicShopShoppingCart'));

    if(saved && saved !== null) {
      cart = saved as IShoppingCart;
    }

    if(cart === null) {
      cart = this.newCart;
    } else {
      Object.setPrototypeOf(cart, this.newCart);
    }
    this.storage.setItem('OrganicShopShoppingCart', JSON.stringify(cart));

    return cart;
  }

  constructor(private newCart: IShoppingCart,
    private storage: IStorage) {
    super();
  }

  public get report(): ShoppingCartReport {
    return this.shoppintCart.report;
  }
  public get totalCount(): number {
    return this.shoppintCart.totalCount;
  }
  public get totalPrice(): number {
    return this.shoppintCart.totalPrice;
  }
  public getProductItemsCount(product: Product): number {
    return this.shoppintCart.getProductItemsCount(product);
  }
  public addProductItem(product: Product): void {
    this.manipulateState((cart: IShoppingCart) => cart.addProductItem(product), (cart: IShoppingCart) => {
      this.onItemAdded.trigger(product);
      this.onItemsCountUpdated.trigger(cart.totalCount);
    });
  }
  public removeProductItem(product: Product): void {
    this.manipulateState((cart: IShoppingCart) => cart.removeProductItem(product), (cart: IShoppingCart) => {
      this.onItemRemoved.trigger(product);
      this.onItemsCountUpdated.trigger(cart.totalCount);
    });
  }
  public clear(): void {
    this.manipulateState((cart: IShoppingCart) => cart.clear(), (cart: IShoppingCart) => {
      this.onItemsCleared.trigger();
      this.onItemsCountUpdated.trigger(cart.totalCount);
    });
  }
  public get itemAdded(): ILiteEvent<Product> {
    return this.onItemAdded.expose();
  }
  public get itemRemoved(): ILiteEvent<Product> {
    return this.onItemRemoved.expose();
  }
  public get itemsCleared(): ILiteEvent<void> {
    return this.onItemsCleared.expose();
  }
  public get itemsCountUpdated(): ILiteEvent<number> {
    return this.onItemsCountUpdated.expose();
  }

  private manipulateState(firstAction?: (cart: IShoppingCart) => void, lastAction?: (cart: IShoppingCart) => void): void {
    if(firstAction || lastAction) {
      let localCart = this.shoppintCart;
      
      if(firstAction) {
        firstAction(localCart);
      }

      this.storage.setItem('OrganicShopShoppingCart', JSON.stringify(localCart));
      
      if(lastAction) {
        lastAction(localCart);
      }
    }
  }
}
