import { TestBed } from '@angular/core/testing';

import { SurveyCatService } from './survey-cat.service';

describe('SurveyCatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SurveyCatService = TestBed.get(SurveyCatService);
    expect(service).toBeTruthy();
  });
});
