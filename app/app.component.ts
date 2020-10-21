import { Component } from "@angular/core";
import { ContentfulService } from "./contentful/services/contentful.service";
import { createClient, Entry, EntryFields } from "contentful";

//import { documentToHtmlString } from "";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
//import { BLOCKS, MARKS } from "@contentful/rich-text-types"

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public articles = [];

  _returnHtmlFromRichText(richText) {
    if (
      richText === undefined ||
      richText === null ||
      richText.nodeType !== "document"
    ) {
      return "<p>Error</p>";
    }
    return documentToHtmlString(richText);
  }

  document = {
    nodeType: "document",
    data: {},
    content: [
      {
        nodeType: "paragraph",
        content: [
          {
            nodeType: "text",
            value: "Most Canadian citizens and many citizens from ",
            marks: [],
            data: {}
          },
          {
            nodeType: "text",
            value: "Visa Waiver Program",
            marks: [
              {
                type: "bold"
              }
            ],
            data: {}
          },
          {
            nodeType: "text",
            value:
              " countries can come to the U.S. without a visa if they meet certain requirements, which you can ",
            marks: [],
            data: {}
          },
          {
            nodeType: "hyperlink",
            content: [
              {
                nodeType: "text",
                value: "read about here",
                marks: [],
                data: {}
              }
            ],
            data: {
              uri: "https://ustraveldocs.com/in/step-1.html#visa-waiver"
            }
          },
          {
            nodeType: "text",
            value: ".",
            marks: [],
            data: {}
          }
        ],
        data: {}
      }
    ]
  };

  constructor(public contentful: ContentfulService) {}

  ngOnInit() {
    this.contentful.getEntries("step1KnowYourVisaType").then(articles => {
      console.log(articles);
      this.articles = articles;
    });
  }
}
