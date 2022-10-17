import { TestBed } from '@angular/core/testing';

import { AddUpdateServiceService } from './add-update-service.service';

describe('AddUpdateServiceService', () => {
  let service: AddUpdateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddUpdateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
