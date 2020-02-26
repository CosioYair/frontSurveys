import { TestBed } from '@angular/core/testing';

import { SurveyTypeService } from './survey-type.service';

describe('SurveyTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SurveyTypeService = TestBed.get(SurveyTypeService);
    expect(service).toBeTruthy();
  });
});
