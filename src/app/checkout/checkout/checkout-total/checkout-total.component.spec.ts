import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutTotalComponent } from './checkout-total.component';

describe('CheckoutTotalComponent', () => {
  let component: CheckoutTotalComponent;
  let fixture: ComponentFixture<CheckoutTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutTotalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
