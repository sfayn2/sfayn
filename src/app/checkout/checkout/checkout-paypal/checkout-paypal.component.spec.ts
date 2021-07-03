import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutPaypalComponent } from './checkout-paypal.component';

describe('CheckoutPaypalComponent', () => {
  let component: CheckoutPaypalComponent;
  let fixture: ComponentFixture<CheckoutPaypalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutPaypalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutPaypalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
