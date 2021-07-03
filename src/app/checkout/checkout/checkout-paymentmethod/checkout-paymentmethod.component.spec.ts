import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutPaymentmethodComponent } from './checkout-paymentmethod.component';

describe('CheckoutPaymentmethodComponent', () => {
  let component: CheckoutPaymentmethodComponent;
  let fixture: ComponentFixture<CheckoutPaymentmethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutPaymentmethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutPaymentmethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
