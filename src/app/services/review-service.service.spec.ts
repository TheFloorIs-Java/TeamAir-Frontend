import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ReviewServiceService } from './review-service.service';

describe('ReviewServiceService', () => {
  let service: ReviewServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ReviewServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
