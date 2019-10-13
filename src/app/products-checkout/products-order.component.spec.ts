import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsCheckoutComponent } from './products-order.component';

describe('ProductsCheckoutComponent', () => {
  let component: ProductsCheckoutComponent;
  let fixture: ComponentFixture<ProductsCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
