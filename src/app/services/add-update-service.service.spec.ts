import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddUpdateServiceService } from './add-update-service.service';

describe('AddUpdateServiceService', () => {
  let service: AddUpdateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule]
    });
    service = TestBed.inject(AddUpdateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
