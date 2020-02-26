import { TestBed } from '@angular/core/testing';

import { AnswerTypeService } from './answer-type.service';

describe('AnswerTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnswerTypeService = TestBed.get(AnswerTypeService);
    expect(service).toBeTruthy();
  });
});
