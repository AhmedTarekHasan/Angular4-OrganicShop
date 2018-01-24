import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProductService } from '../models/abstractions/product-service';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../models/product';
import { ICategoryService } from '../models/abstractions/category-service';
import { Category } from '../models/category';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  private productsSubscription: Subscription;
  private categoriesSubscription: Subscription;

  constructor(private productService: IProductService,
    private categoryService: ICategoryService,
    private route: ActivatedRoute) {
    this.categoriesSubscription = this.categoryService.getAll().subscribe((categories: Category[]) => {
      if(categories && categories.length > 0) {
        this.categories = categories;

        this.productsSubscription = this.productService.getAll().subscribe((products: Product[]) => {
          this.products = products.sort((a: Product, b: Product) => {
            let result = 0;
            const left = a.title;
            const right = b.title;
      
            if(left > right) {
              result = 1;
            } else if(left < right) {
              result = -1;
            }
      
            return result;
          });
          
          this.filterByCategory(this.selectedCategory);
        });

        this.route.queryParamMap.subscribe(params => {
          if(params.get('category')) {
            this.selectedCategory = this.categories.find((cat, index, arr) => {
              return cat.id === params.get('category');
            }); 
          } else {
            this.selectedCategory = null;
          }

          this.filterByCategory(this.selectedCategory);
        });
      }
    });
  }

  public products: Product[] = [];
  public filteredProducts: Product[] = [];
  public categories: Category[] = [];
  public selectedCategory: Category;

  public filterByCategory(category: Category): void {
    this.selectedCategory = category;

    if(this.selectedCategory) {
      this.filteredProducts = this.products.filter((product, index, arr) => {
        return product.categoryId === category.id;
      });
    } else {
      this.filteredProducts = this.products;
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if(this.productsSubscription) this.productsSubscription.unsubscribe();
    if(this.categoriesSubscription) this.categoriesSubscription.unsubscribe();
  }

}
