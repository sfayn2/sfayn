import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductsDetailComponent } from './products-detail.component';

describe('ProductsDetailComponent', () => {
  let component: ProductsDetailComponent;
  let fixture: ComponentFixture<ProductsDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
