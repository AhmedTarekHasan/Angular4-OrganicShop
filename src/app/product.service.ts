import { Injectable } from '@angular/core';
import { IProductService } from './models/abstractions/product-service';
import { Product } from './models/product';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase'; 
import { isUndefined } from 'util';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import * as _ from 'lodash';

@Injectable()
export class ProductService extends IProductService {

  constructor(private db: AngularFireDatabase) { super(); }

  create(product: Product) {
    return this.db.list('/products').push(product);
  }

  getAll(): Observable<Product[]> {
    return (this.db.list('/products')).snapshotChanges().map((a: any[]) => {
      return a.map(prod => {
        let extended = _.cloneDeep(prod.payload.val());
        extended.id = prod.key;
        return <Product>extended;
      });
    });
  }

  get(id: string): Observable<Product> {
    return this.db.object('/products/' + id).snapshotChanges().switchMap((prod: any, index) => {
      let extended = _.cloneDeep(prod.payload.val());
      extended.id = prod.key;
      return Observable.of(<Product>extended);
    });
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
