import { TestBed } from '@angular/core/testing';

import { PromotionalService } from './promotional.service';

describe('PromotionalService', () => {
  let service: PromotionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromotionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
