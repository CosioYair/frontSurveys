import { TestBed } from '@angular/core/testing';

import { ContractTypeService } from './contract-type.service';

describe('ContractTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContractTypeService = TestBed.get(ContractTypeService);
    expect(service).toBeTruthy();
  });
});
