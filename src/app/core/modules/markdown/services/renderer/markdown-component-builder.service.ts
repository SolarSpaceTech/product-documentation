import { ComponentRef, Injectable } from '@angular/core';
import { MarkdownBlockEnum, MarkdownInlineEnum, MarkdownOtherEnum } from 'markdown/enums';
import { MarkdownRendererModel } from 'markdown/models';
import { Token, Tokens } from 'marked';
import {
  MarkdownBlockquoteComponent,
  MarkdownCodeComponent,
  MarkdownHtmlComponent,
  MarkdownImageComponent,
  MarkdownLinkComponent,
  MarkdownH1Component,
  MarkdownH2Component,
  MarkdownH3Component,
  MarkdownH4Component,
  MarkdownH5Component,
  MarkdownH6Component,
  MarkdownTableComponent,
} from 'markdown/components';

@Injectable()
export class MarkdownComponentBuilderService {
  private componentMap = {
    [MarkdownBlockEnum.Blockquote]: () => MarkdownBlockquoteComponent,
    [MarkdownBlockEnum.Code]: () => MarkdownCodeComponent,
    [MarkdownBlockEnum.Table]: () => MarkdownTableComponent,
    [MarkdownBlockEnum.Heading]: this.createHeadingElement.bind(this),
    [MarkdownInlineEnum.Link]: () => MarkdownLinkComponent,
    [MarkdownInlineEnum.Image]: () => MarkdownImageComponent,
    [MarkdownOtherEnum.Html]: () => MarkdownHtmlComponent,
  };

  public has(type: string): boolean {
    return Boolean(this.componentMap[type]);
  }

  public createElement(params: MarkdownRendererModel, token: Token): void {
    const componentConstructor = this.componentMap[token.type](token);
    const component: ComponentRef<any> = params.viewContainerRef.createComponent(componentConstructor, { injector: params.injector });
    component.instance.token = token;
    params.renderer.appendChild(params.parentElement, component.location.nativeElement);
  }

  private createHeadingElement(token: Tokens.Heading): any {
    switch (token.depth) {
      case 1:
        return MarkdownH1Component;
      case 2:
        return MarkdownH2Component;
      case 3:
        return MarkdownH3Component;
      case 4:
        return MarkdownH4Component;
      case 5:
        return MarkdownH5Component;
      case 6:
        return MarkdownH6Component;
    }
  }
}
