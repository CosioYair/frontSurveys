import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SurveySectionService } from './surveySection.service';

describe('SurveySectionService', () => {
  let service: SurveySectionService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(SurveySectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
