import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { isPlatformServer } from '@angular/common';
import { REQUEST } from '../../server.tokens';

@Injectable({
  providedIn: 'root',
})
export class UniversalDeviceDetectorService extends DeviceDetectorService {
  constructor(
    @Inject(PLATFORM_ID) platformId: any,
    @Optional() @Inject(REQUEST) request: Request
  ) {
    super(platformId);
    if (isPlatformServer(platformId) && request) {
      super.setDeviceInfo(request.headers.get('user-agent') || '');
    }
  }
}
