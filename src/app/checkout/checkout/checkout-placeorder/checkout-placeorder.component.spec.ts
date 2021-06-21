import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutPlaceorderComponent } from './checkout-placeorder.component';

describe('CheckoutPlaceorderComponent', () => {
  let component: CheckoutPlaceorderComponent;
  let fixture: ComponentFixture<CheckoutPlaceorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutPlaceorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutPlaceorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
