import { Injectable } from '@angular/core';
import { MarkdownBlockEnum, MarkdownInlineEnum } from 'markdown/enums';
import { MarkdownRendererModel } from 'markdown/models';
import { Token, Tokens } from 'marked';

@Injectable()
export class MarkdownHtmlElementBuilderService {
  private htmlElementBuilderMap = {
    [MarkdownBlockEnum.Heading]: this.createHeadingElement,
    [MarkdownBlockEnum.Paragraph]: this.createParagraphElement,
    [MarkdownBlockEnum.List]: this.createListElement,
    [MarkdownBlockEnum.ListItem]: this.createListItemElement,
    [MarkdownBlockEnum.Hr]: this.createHrElement,
    [MarkdownInlineEnum.Br]: this.createBrElement,
    [MarkdownInlineEnum.Em]: this.createEmElement,
    [MarkdownInlineEnum.Strong]: this.createStrongElement,
    [MarkdownInlineEnum.Codespan]: this.createCodeSpanElement,
    [MarkdownInlineEnum.Image]: this.createImageElement,
  };

  public has(type: string): boolean {
    return this.htmlElementBuilderMap[type];
  }

  public createElement(params: MarkdownRendererModel, token: Token): HTMLElement {
    return this.htmlElementBuilderMap[token.type](params, token);
  }

  private createHeadingElement({ renderer }: MarkdownRendererModel, token: Tokens.Heading): HTMLHeadingElement {
    return renderer.createElement(`h${token.depth}`);
  }

  private createParagraphElement({ renderer }: MarkdownRendererModel): HTMLParagraphElement {
    return renderer.createElement('p');
  }

  private createListElement(params: MarkdownRendererModel, token: Tokens.List): HTMLUListElement | HTMLOListElement {
    const tag = token.ordered ? 'ol' : 'ul';
    return params.renderer.createElement(tag);
  }

  private createListItemElement({ renderer }: MarkdownRendererModel): HTMLLIElement {
    return renderer.createElement('li');
  }

  private createEmElement({ renderer }: MarkdownRendererModel): HTMLElement {
    return renderer.createElement('em');
  }

  private createStrongElement({ renderer }: MarkdownRendererModel): HTMLElement {
    return renderer.createElement('strong');
  }

  private createCodeSpanElement({ renderer }: MarkdownRendererModel): HTMLElement {
    return renderer.createElement('code');
  }

  private createBrElement({ renderer }: MarkdownRendererModel): HTMLElement {
    return renderer.createElement('br');
  }

  private createHrElement({ renderer }: MarkdownRendererModel): HTMLElement {
    return renderer.createElement('hr');
  }

  private createImageElement({ renderer }: MarkdownRendererModel, token: Tokens.Image): HTMLElement {
    const element = renderer.createElement('img');
    renderer.setAttribute(element, 'src', token.href);
    if (token.title) {
      renderer.setAttribute(element, 'title', token.title);
    }
    if (token.text) {
      renderer.setAttribute(element, 'alt', token.text);
    }
    return element;
  }
}
