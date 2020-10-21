import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';

import { ContentfulService, ContentfulConfigService } from './services';
import { ContentfulConfig } from './models/contentful-config';

@NgModule()
export class ContentfulModule {

  static forRoot(config: ContentfulConfig): ModuleWithProviders {
    return {
      ngModule: ContentfulModule,
      providers: [
        ContentfulService,
        {
          provide: ContentfulConfigService,
          useValue: config
        }
      ]
    }
  }
}