import { ComponentRef, Injectable } from '@angular/core';
import { MarkdownBlockEnum, MarkdownInlineEnum, MarkdownOtherEnum } from 'markdown/enums';
import { MarkdownRendererModel } from 'markdown/models';
import { Token } from 'marked';
import {
  MarkdownBlockquoteComponent,
  MarkdownCodeComponent,
  MarkdownHtmlComponent,
  MarkdownImageComponent,
  MarkdownLinkComponent,
  MarkdownTableComponent
} from 'markdown/components';

@Injectable()
export class MarkdownComponentBuilderService {
  private componentMap = {
    [MarkdownBlockEnum.Blockquote]: MarkdownBlockquoteComponent,
    [MarkdownBlockEnum.Code]: MarkdownCodeComponent,
    [MarkdownBlockEnum.Table]: MarkdownTableComponent,
    [MarkdownInlineEnum.Link]: MarkdownLinkComponent,
    [MarkdownInlineEnum.Image]: MarkdownImageComponent,
    [MarkdownOtherEnum.Html]: MarkdownHtmlComponent,
  };

  public has(type: string): boolean {
    return Boolean(this.componentMap[type]);
  }

  public createElement(params: MarkdownRendererModel, token: Token): void {
    const component: ComponentRef<any> = params.viewContainerRef.createComponent(this.componentMap[token.type], { injector: params.injector });
    component.instance.token = token;
    params.renderer.appendChild(params.parentElement, component.location.nativeElement);
  }
}
