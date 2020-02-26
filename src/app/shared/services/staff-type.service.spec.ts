import { TestBed } from '@angular/core/testing';

import { StaffTypeService } from './staff-type.service';

describe('StaffTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StaffTypeService = TestBed.get(StaffTypeService);
    expect(service).toBeTruthy();
  });
});
