import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutItemsComponent } from './checkout-items.component';

describe('CheckoutItemsComponent', () => {
  let component: CheckoutItemsComponent;
  let fixture: ComponentFixture<CheckoutItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
