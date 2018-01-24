import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase'; 
import { Observable } from 'rxjs/Observable';
import { Category } from './models/category';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { ICategoryService } from './models/abstractions/category-service';

@Injectable()
export class CategoryService extends ICategoryService {

  constructor(private db: AngularFireDatabase) { super(); }

  getAll(): Observable<Category[]> {
    return this.db.list("/categories").valueChanges().map(categories => {
      let results: Category[] = [];

      if(categories && categories.length > 0) {
        results = this.transformFirebaseCategoriesToCategories(categories);
      }

      return this.sortCategories(results);
    });
  }

  private transformFirebaseCategoryToCategory(firebaseCategory: any): Category {
    return {
      id: firebaseCategory.id,
      name: firebaseCategory.name
    };
  }

  private transformFirebaseCategoriesToCategories(firebaseCategories: any[]): Category[] {
    return firebaseCategories.map(cat => {
      return this.transformFirebaseCategoryToCategory(cat);
    });
  }

  private sortCategories(categories: Category[]) {
    return categories.sort((categA: Category, categB: Category) => {
      let result = 0;
      
      if(categA > categB) {
        result = 1
      } else if(categA < categB) {
        result = -1
      }

      return result;
    });
  }
}
