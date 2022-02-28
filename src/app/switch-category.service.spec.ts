import { TestBed } from '@angular/core/testing';

import { SwitchCategoryService } from './switch-category.service';

describe('SwitchCategoryService', () => {
  let service: SwitchCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwitchCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
