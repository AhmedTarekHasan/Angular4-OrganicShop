import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product = <Product>{};
  @Input('showActions') showActions: boolean = false;
  @Input('count') count: number = 0;
  @Output('add') add = new EventEmitter();
  @Output('remove') remove = new EventEmitter();

  constructor() { }

  public onAdd(count: number) {
    this.add.emit(count);
  }
  public onRemove(count: number) {
    this.remove.emit(count);
  }

  ngOnInit() {
  }

}
