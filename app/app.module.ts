import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { MarkdownToHtmlModule } from "markdown-to-html-pipe";

import { AppComponent } from "./app.component";
import { ContentfulModule } from "./contentful/contentful.module";
import { ContentfulConfig } from "./contentful/models/contentful-config";

/**
 * This is our configuration object!
 */
const contentfulConfig: ContentfulConfig = {
  spaceId: "pitqj5emwdvc",
  accessToken: "cAru_8SCspcitiU81TWE79GQj5v0CU00xnrbUP4Y5MQ"
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ContentfulModule.forRoot(contentfulConfig),
    MarkdownToHtmlModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
