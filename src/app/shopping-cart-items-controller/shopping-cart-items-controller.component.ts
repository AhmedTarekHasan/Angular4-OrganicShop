import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shopping-cart-items-controller',
  templateUrl: './shopping-cart-items-controller.component.html',
  styleUrls: ['./shopping-cart-items-controller.component.css']
})
export class ShoppingCartItemsControllerComponent implements OnInit {
  @Input('count') count: number = 0;
  @Input('canAdd') canAdd: boolean = true;
  @Input('canRemove') canRemove: boolean = true;
  
  @Output('add') add = new EventEmitter();
  @Output('remove') remove = new EventEmitter();
  
  constructor() { }

  public addItem(): void {
    this.count++;
    this.add.emit(this.count);
  }
  public removeItem(): void {
    if(this.canRemoveItem) {
      this.count--;
      this.remove.emit(this.count);
    }
  }

  public get canRemoveItem(): boolean {
    return this.canRemove && (this.count > 0);
  }

  ngOnInit() {
  }

}
