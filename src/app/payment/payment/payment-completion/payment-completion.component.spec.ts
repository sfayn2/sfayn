import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCompletionComponent } from './payment-completion.component';

describe('PaymentCompletionComponent', () => {
  let component: PaymentCompletionComponent;
  let fixture: ComponentFixture<PaymentCompletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentCompletionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
