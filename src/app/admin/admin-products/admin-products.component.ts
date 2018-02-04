import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProductService } from '../../models/abstractions/product-service';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../models/product';
import { SortProperty } from './sort-property';
import { SortDirection } from '../../models/sort-direction';
import { DataTableResource } from 'angular5-data-table';

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
      this.initialSort();
      this.filter();
      //this.initializeTable(this.filteredProducts);
      //this.bindGrid();
    });
  }

  public tableResource: DataTableResource<Product>;
  public items: Product[] = [];
  public itemsCount: number = 0;
  public products: Product[] = [];
  public filteredProducts: Product[] = [];
  public filteringQuery: string = '';
  //public sortProperty: SortProperty = SortProperty.title;
  //public sortDirection: SortDirection = SortDirection.Ascending;

  private initializeTable(products: Product[]) {
    this.itemsCount = 0;
    this.tableResource = new DataTableResource<Product>(products);
    this.tableResource.query({ offset: 0, index: '1', limit: 10 }).then((items) => {
      this.items = items;
      this.tableResource.count().then(count => this.itemsCount = count);
    });
  }

  reloadItems(params) {
    if(this.tableResource) {
      this.tableResource.query(params).then((items) => {
        this.items = items;
        this.tableResource.count().then(count => this.itemsCount = count);
      });
    }
  }

  filter(): void {
    if(this.filteringQuery && this.filteringQuery !== '') {
      this.filteredProducts = this.products.filter((product, index, arr) => {
        return product.title.toLowerCase().trim().indexOf(this.filteringQuery.toLowerCase().trim()) !== -1;
      });
    } else {
      this.filteredProducts = this.products;
    }

    this.initializeTable(this.filteredProducts);
  }

  initialSort(): void {
    this.filteredProducts = this.filteredProducts.sort((a: Product, b: Product) => {
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
  }

  delete(product: Product) {
    if(confirm('Are you sure you want too delete this product?')) {
      this.productsService.delete(product).then(value => {
        let index = this.products.findIndex((prod, index, arr) => {
          return prod.id === product.id;
        });

        this.products = this.products.slice(0, index).concat(this.products.slice(index + 1));
      });
    }
  }

  /*sort(): void {
    this.filteredProducts = this.filteredProducts.sort((a: Product, b: Product) => {
      let result = 0;
      const left = a[this.sortProperty];
      const right = b[this.sortProperty];

      if(left > right) {
        result = -1;
      } else if(left < right) {
        result = 1;
      }

      if(this.sortDirection === SortDirection.Ascending) {
        result = result * -1;
      }

      return result;
    });
  }*/

  /*setSorting(sortProperty: SortProperty): void {
    this.sortProperty = sortProperty;

    if(this.sortDirection === SortDirection.Ascending) {
      this.sortDirection = SortDirection.Descending;
    } else {
      this.sortDirection = SortDirection.Ascending;
    }

    this.bindGrid();
  }*/

  /*bindGrid(): void {
    this.filter();
    this.sort();
  }*/

  ngOnInit() {
  }

  ngOnDestroy() {
    if(this.productsSubscription) this.productsSubscription.unsubscribe();
  }

}
