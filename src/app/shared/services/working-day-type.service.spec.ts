import { TestBed } from '@angular/core/testing';

import { WorkingDayTypeService } from './working-day-type.service';

describe('WorkingDayTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkingDayTypeService = TestBed.get(WorkingDayTypeService);
    expect(service).toBeTruthy();
  });
});
