import { TestBed } from '@angular/core/testing';

import { LifeUpdaterService } from './life-updater.service';

describe('LifeUpdaterService', () => {
  let service: LifeUpdaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LifeUpdaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
