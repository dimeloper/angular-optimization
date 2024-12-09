import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { isPlatformServer } from '@angular/common';
import { REQUEST } from '../../server.tokens';

@Injectable({
  providedIn: 'root',
})
export class UniversalDeviceDetectorService extends DeviceDetectorService {
  constructor() {
    const platformId = inject(PLATFORM_ID);
    const request = inject<Request>(REQUEST, { optional: true });

    super(platformId);
    if (isPlatformServer(platformId) && request) {
      super.setDeviceInfo(request.headers.get('user-agent') || '');
    }
  }
}
