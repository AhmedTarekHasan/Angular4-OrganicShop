import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../../category.service';
import { Category } from '../../models/category';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import { ProductService } from '../../product.service';
import { Product } from '../../models/product';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductFormValidators } from './product-form.validators';
import * as utilities from '../../../app/shared/utilities';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  private categoriesSubscription: Subscription;

  constructor(private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router) {
    this.categoriesSubscription = this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  public categories: Category[];

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
      this.productService.create(this.form.value).then(value => {
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
    this.categoriesSubscription.unsubscribe();
  }

}
