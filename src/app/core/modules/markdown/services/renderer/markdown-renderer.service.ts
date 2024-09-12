import { Injectable } from '@angular/core';
import { Token } from 'marked';
import { MarkdownRendererModel } from 'markdown/models';
import { MarkdownHtmlElementBuilderService } from './markdown-html-element-builder.service';
import { MarkdownOtherElementBuilderService } from './markdown-other-element-builder.service';
import { MarkdownComponentBuilderService } from './markdown-component-builder.service';

@Injectable()
export class MarkdownRendererService {
  constructor(
    private readonly markdownComponentBuilderService: MarkdownComponentBuilderService,
    private readonly markdownHtmlElementBuilderService: MarkdownHtmlElementBuilderService,
    private readonly markdownOtherElementBuilderService: MarkdownOtherElementBuilderService,
  ) {
  }

  public render(params: MarkdownRendererModel): void {
    params.tokens.forEach((token: Token) => {
      if (this.markdownComponentBuilderService.has(token.type)) {
        this.appendComponent(params, token);
        return;
      }

      if (this.markdownOtherElementBuilderService.has(token.type)) {
        this.appendOtherElement(params, token);
        return;
      }

      if (this.markdownHtmlElementBuilderService.has(token.type)) {
        this.appendHtmlElement(params, token);
        return;
      }
    });
  }

  private appendComponent(params: MarkdownRendererModel, token: Token): void {
    this.markdownComponentBuilderService.createElement(params, token);
  }

  private appendOtherElement(params: MarkdownRendererModel, token: Token): void {
    if ('tokens' in token) {
      this.render({
        ...params,
        tokens: token.tokens,
      });
    } else {
      const element = this.markdownOtherElementBuilderService.createElement(params, token);
      params.renderer.appendChild(params.parentElement, element);
    }
  }

  private appendHtmlElement(params: MarkdownRendererModel, token: Token): void {
    const element = this.markdownHtmlElementBuilderService.createElement(params, token);

    const tokens = this.getTokens(token);
    if (tokens?.length) {
      this.render({
        ...params,
        tokens: this.getTokens(token),
        parentElement: element,
      });
    } else if ('text' in token) {
      this.render({
        ...params,
        tokens: [{ ...token, type: 'text'}],
        parentElement: element,
      });
    }

    params.renderer.appendChild(params.parentElement, element);
  }

  private getTokens(token: Token): Token[] {
    let tokens = [];
    if ('tokens' in token) {
      tokens = token.tokens;
    } else if ('items' in token) {
      tokens = token.items;
    }
    return tokens;
  }
}
