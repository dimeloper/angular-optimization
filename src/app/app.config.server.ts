import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { UniversalDeviceDetectorService } from './services/universal-device-detector.service';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(), UniversalDeviceDetectorService],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
