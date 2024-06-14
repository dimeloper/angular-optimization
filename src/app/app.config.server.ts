import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { UniversalDeviceDetectorService } from './services/universal-device-detector.service';
import { DeviceDetectorService } from 'ngx-device-detector';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
      provide: DeviceDetectorService,
      useClass: UniversalDeviceDetectorService,
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
