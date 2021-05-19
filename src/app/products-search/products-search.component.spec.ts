import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductsSearchComponent } from './products-search.component';

describe('ProductsSearchComponent', () => {
  let component: ProductsSearchComponent;
  let fixture: ComponentFixture<ProductsSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
