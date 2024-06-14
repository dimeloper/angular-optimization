import { TestBed } from '@angular/core/testing';

import { UniversalDeviceDetectorService } from './universal-device-detector.service';

describe('UniversalDeviceDetectorService', () => {
  let service: UniversalDeviceDetectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniversalDeviceDetectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
