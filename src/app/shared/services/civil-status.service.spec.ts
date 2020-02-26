import { TestBed } from '@angular/core/testing';

import { CivilStatusService } from './civil-status.service';

describe('CivilStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CivilStatusService = TestBed.get(CivilStatusService);
    expect(service).toBeTruthy();
  });
});
