import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ICategoryService } from '../../models/abstractions/category-service';
import { Category } from '../../models/category';
 
@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit, OnDestroy {
  @Input('selectedCategoryId') selectedCategoryId: string;
  @Output('selectedCategoryIdChanged') selectedCategoryIdChanged = new EventEmitter();
  
  private categoriesSubscription: Subscription;

  constructor(private categoryService: ICategoryService) {
    this.categoriesSubscription = this.categoryService.getAll().subscribe((categories: Category[]) => {
      if(categories && categories.length > 0) {
        this.categories = categories;
      } else {
        this.categories = [];
      }
    });
  }

  public categories: Category[] = [];

  public setSelectedCategoryId(id: string): void {
    this.selectedCategoryId = id;
    this.selectedCategoryIdChanged.emit(id);
  }
  
  ngOnInit() {
  }

  ngOnDestroy() {
    if(this.categoriesSubscription) this.categoriesSubscription.unsubscribe();
  }
}
