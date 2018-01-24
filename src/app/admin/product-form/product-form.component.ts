import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../../models/category';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import { Product } from '../../models/product';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductFormValidators } from './product-form.validators';
import * as utilities from '../../../app/shared/utilities';
import { Router, ActivatedRoute } from '@angular/router';
import { IProductService } from '../../models/abstractions/product-service';
import { ICategoryService } from '../../models/abstractions/category-service';
import { DisplayMode } from '../../models/display-mode';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {  
  private categoriesSubscription: Subscription;
  private productSubscription: Subscription;
  private displayMode: DisplayMode = DisplayMode.Add;

  constructor(private productService: IProductService,
    private categoryService: ICategoryService,
    private router: Router,
    private route: ActivatedRoute) {
    this.categoriesSubscription = this.categoryService.getAll().take(1).subscribe((categories: Category[]) => {
      this.categories = categories;
    });

    let productId = this.route.snapshot.paramMap.get('id');

    if(productId) {
      this.displayMode = DisplayMode.Edit;

      this.productSubscription = this.productService.get(productId).take(1).subscribe(prod => {
        this.productToEdit = prod;
      });
    }
  }

  public categories: Category[];
  public productToEdit: Product = <Product>{};

  public form: FormGroup = new FormGroup({
    'title': new FormControl(
      '',
      [
        utilities.CustomValidators.required('Title')
      ],
      [
        this.productFormValidators.titleIsUnique()
      ]
    ),
    'price': new FormControl(
      '',
      [
        utilities.CustomValidators.required('Price'),
        utilities.CustomValidators.maxValueExclusive('Price', 0)
      ],
      [

      ]
    ),
    'category': new FormControl(
      '',
      [
        utilities.CustomValidators.required('Category')
      ],
      [

      ]
    ),
    'imageUrl': new FormControl(
      '',
      [
        utilities.CustomValidators.required('Image Url'),
        utilities.CustomValidators.url('Image Url')
      ],
      [

      ]
    ),
  });

  get title(): FormControl {
    return <FormControl>this.form.get('title');
  }

  get titleErrors(): any[] {
    return this.getErrors(this.title);
  }

  get price(): FormControl {
    return <FormControl>this.form.get('price');
  }

  get priceErrors(): any[] {
    return this.getErrors(this.price);
  }

  get category(): FormControl {
    return <FormControl>this.form.get('category');
  }

  get categoryErrors(): any[] {
    return this.getErrors(this.category);
  }

  get imageUrl(): FormControl {
    return <FormControl>this.form.get('imageUrl');
  }

  get imageUrlErrors(): any[] {
    return this.getErrors(this.imageUrl);
  }

  get productFormValidators(): ProductFormValidators {
    return new ProductFormValidators(this.productService);
  }

  public save() {
    if(this.form.valid) {
      if(this.displayMode === DisplayMode.Add) {
        this.productService.create(this.productToEdit).then(value => {
          this.router.navigate(['/admin/products']);
        });
      } else {
        this.productService.update(this.productToEdit).then(value => {
          this.router.navigate(['/admin/products']);
        });
      }
    }
  }

  public delete() {
    if(confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(this.productToEdit).then(value => {
        this.router.navigate(['/admin/products']);
      });
    }
  }

  private getErrors(parentObj: any) {
    let errors = [];
  
    for(let err in parentObj.errors) {
      errors.push(parentObj.errors[err]);
    }

    return errors;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if(this.categoriesSubscription) this.categoriesSubscription.unsubscribe();
    if(this.productSubscription) this.productSubscription.unsubscribe();
  }

}