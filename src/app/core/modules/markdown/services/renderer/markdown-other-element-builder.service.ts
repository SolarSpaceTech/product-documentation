import { Injectable } from '@angular/core';
import { MarkdownOtherEnum } from 'markdown/enums';
import { MarkdownRendererModel } from 'markdown/models';
import { Token, Tokens } from 'marked';

@Injectable()
export class MarkdownOtherElementBuilderService {
  private otherElementBuilderMap = {
    [MarkdownOtherEnum.Text]: this.createTextElement,
    [MarkdownOtherEnum.Space]: this.createSpaceElement,
  };

  public has(type: string): boolean {
    return this.otherElementBuilderMap[type];
  }

  public createElement(params: MarkdownRendererModel, token: Token): HTMLElement {
    return this.otherElementBuilderMap[token.type](params, token);
  }

  private createTextElement({ renderer }: MarkdownRendererModel, token: Tokens.Text): CharacterData {
    const element: CharacterData = renderer.createText(token.text);
    element.data = element.data
      .replace(/&quot;/gm, '\"')
      .replace(/&#39;/gm, '\'');
    return element;
  }

  private createSpaceElement({ renderer }: MarkdownRendererModel, token: Tokens.Space): CharacterData {
    return renderer.createText('');
  }
}
