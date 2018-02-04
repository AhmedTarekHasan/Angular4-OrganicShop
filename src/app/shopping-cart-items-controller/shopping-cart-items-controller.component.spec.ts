import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartItemsControllerComponent } from './shopping-cart-items-controller.component';

describe('ShoppingCartItemsControllerComponent', () => {
  let component: ShoppingCartItemsControllerComponent;
  let fixture: ComponentFixture<ShoppingCartItemsControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingCartItemsControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartItemsControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
