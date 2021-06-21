import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutVoucherComponent } from './checkout-voucher.component';

describe('CheckoutVoucherComponent', () => {
  let component: CheckoutVoucherComponent;
  let fixture: ComponentFixture<CheckoutVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutVoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
