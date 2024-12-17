import { TestBed } from '@angular/core/testing';

import { RegisterParametersService } from './register-parameters.service';

describe('RegisterParametersService', () => {
  let service: RegisterParametersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterParametersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
