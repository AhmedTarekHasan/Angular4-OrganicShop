import { Injectable } from '@angular/core';
import { IProductService } from './models/abstractions/product-service';
import { Product } from './models/product';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase'; 
import { isUndefined } from 'util';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class ProductService implements IProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: Product) {
    return this.db.list('/products').push(product);
  }

  checkTitleIsUnique(title: string): boolean {
    let isUnique: boolean = true;

    /*let b = this.db.object('/products/' + title);

    if(b) {
      isUnique = false;
    }*/

    return isUnique;
  }
}
