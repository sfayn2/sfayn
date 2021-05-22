import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersAddressComponent } from './customers-address.component';

describe('CustomersAddressComponent', () => {
  let component: CustomersAddressComponent;
  let fixture: ComponentFixture<CustomersAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
