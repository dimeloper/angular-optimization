import { provideServerRendering, withRoutes } from '@angular/ssr';
import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { appConfig } from './app.config';
import { UniversalDeviceDetectorService } from './services/universal-device-detector.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    {
      provide: DeviceDetectorService,
      useClass: UniversalDeviceDetectorService,
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
