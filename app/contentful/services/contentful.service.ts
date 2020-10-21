import { Injectable, Inject } from '@angular/core';
import { ContentfulConfig } from '../models/contentful-config';
import { ContentfulConfigService } from './contentful-config.service';

declare const contentful: any;

@Injectable()
export class ContentfulService {

  private client;

  constructor(@Inject(ContentfulConfigService) private config) {
    this.initClient();
  }

  /**
   * Initializes the client
   */
  private initClient() {
    this.client = contentful.createClient({
      space: this.config.spaceId,
      accessToken: this.config.accessToken
    });
  }

  /**
   * Checks the browser language first, then the available ones
   */
  private getDefaultLanguage(): Promise<any> {
    return this.getLocales().then((locales) => {
      for(let lang of locales) {
        /** 
         * We use includes because, for example, 
         * 'it' is the language while 'it-IT' the locale
         */
        if(lang.code.includes(navigator.language)) {
          return lang.code;
        }
      }
      return locales[0].code;
    })
    .catch(console.error);
  }

  /**
   * @param {string} contentType -  The content type (ex. 'article')
   * @returns The entries for the selected type
   */
  public getEntries(contentType: string): Promise<any> {
    return this.getDefaultLanguage().then(lang => {
      return this.client.getEntries({
        locale: lang,
        content_type: contentType
      })
      .then((response) => response.items)
    })
    .catch(console.error)
  }

  /**
   * @returns The available locales of the space
   */
  private getLocales(): Promise<any> {
    return this.client.getSpace()
      .then(space => space.locales)
      .catch(console.error);
  }
}