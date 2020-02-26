import { TestBed } from '@angular/core/testing';

import { PositionTypeService } from './position-type.service';

describe('PositionTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PositionTypeService = TestBed.get(PositionTypeService);
    expect(service).toBeTruthy();
  });
});
