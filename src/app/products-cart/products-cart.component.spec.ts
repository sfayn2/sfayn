import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductsCartComponent } from './products-cart.component';

describe('ProductsCartComponent', () => {
  let component: ProductsCartComponent;
  let fixture: ComponentFixture<ProductsCartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
