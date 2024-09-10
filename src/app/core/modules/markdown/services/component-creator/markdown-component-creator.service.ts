import { Injectable, Type, ViewContainerRef} from "@angular/core";
import { MarkdownBlockEnum, MarkdownInlineEnum } from "../../enums";
import {
  MarkdownBlockquoteComponent,
  MarkdownCodeComponent,
  MarkdownHeadingComponent,
  MarkdownParagraphComponent,
  MarkdownLinkComponent,
} from "markdown/components";
import { Token} from "marked";

@Injectable()
export class MarkdownComponentCreatorService {
  private readonly componentMap = new Map<string, Type<any>>([
    [MarkdownBlockEnum.Blockquote, MarkdownBlockquoteComponent],
    [MarkdownBlockEnum.Code, MarkdownCodeComponent],
    [MarkdownBlockEnum.Heading, MarkdownHeadingComponent],
    [MarkdownBlockEnum.Paragraph, MarkdownParagraphComponent],
    [MarkdownInlineEnum.Link, MarkdownLinkComponent],
  ]);

  public create(markdownToken: Token, viewContainerRef: ViewContainerRef): void {
    const componentType = this.componentMap.get(markdownToken.type);
    const component = viewContainerRef.createComponent(componentType);
    component.instance.token = markdownToken;
  }

  public canCreate(tokenType: string): boolean {
    return this.componentMap.has(tokenType)
  }
}
