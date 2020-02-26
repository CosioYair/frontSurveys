import { TestBed } from '@angular/core/testing';

import { SurveyQuestService } from './survey-quest.service';

describe('SurveyQuestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SurveyQuestService = TestBed.get(SurveyQuestService);
    expect(service).toBeTruthy();
  });
});
