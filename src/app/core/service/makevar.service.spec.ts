import { TestBed } from '@angular/core/testing';

import { MakevarService } from './makevar.service';

describe('MakevarService', () => {
  let service: MakevarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MakevarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
