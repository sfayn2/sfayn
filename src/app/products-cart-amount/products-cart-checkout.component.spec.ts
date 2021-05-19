import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductsCartCheckoutComponent } from './products-cart-checkout.component';

describe('ProductsCartCheckoutComponent', () => {
  let component: ProductsCartCheckoutComponent;
  let fixture: ComponentFixture<ProductsCartCheckoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsCartCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsCartCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
