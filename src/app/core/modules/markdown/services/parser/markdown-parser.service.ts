import { Injectable } from '@angular/core';
import {
  MarkedOptions,
  MarkedToken,
  Renderer,
  TextRenderer,
  Token,
  Tokens,
  defaults, marked,
} from 'marked';
import { MarkdownBlockEnum, MarkdownCustomEnum, MarkdownInlineEnum, MarkdownOtherEnum } from 'markdown/enums';
import { MarkdownTokenModel } from 'markdown/models';

@Injectable({
  providedIn: 'root',
})
export class MarkdownParserService {
  private readonly TARGET_LINK_RULE = RegExp(marked.Lexer.rules.inline.normal.link.source.replace('^!?', '^{:target=_blank}'));

  options: MarkedOptions;
  renderer: Renderer;
  textRenderer: TextRenderer;

  constructor() {
    this.addTargetLinkToParser();
    this.options = defaults;
    this.options.renderer = this.options.renderer || new Renderer();
    this.renderer = this.options.renderer;
    this.renderer.options = this.options;
    this.renderer.parser = this;
    this.textRenderer = new TextRenderer();
  }

  private addTargetLinkToParser(): void {
    marked.use({
      extensions: [{
        name: MarkdownCustomEnum.TargetLink,
        level: 'inline',
        start: (src: string): number => src.match(/^{:target=_blank}/)?.index,
        tokenizer: (src: string): any => {
          const cap = this.TARGET_LINK_RULE.exec(src);
          if (cap) {
            return {
              type: MarkdownCustomEnum.TargetLink,
              raw: cap[0],
              href: cap[2],
              text: cap[1],
            };
          }
        },
        renderer(token: MarkdownTokenModel): string {
          return `<a href="${token.href}" target="_blank">${token.text}</a>`;
        }
      }],
    });
  }

  /**
   * Parse Loop
   */
  parse(tokens: Token[], top = true): string {
    let out = '';

    for (let i = 0; i < tokens.length; i++) {
      const anyToken = tokens[i];

      // Run any renderer extensions
      const renderer = this.options?.extensions?.renderers?.[anyToken.type];
      if (renderer) {
        const genericToken = anyToken as Tokens.Generic;
        const ret = renderer.call({ parser: this }, genericToken);
        if (ret !== false) {
          out += ret || '';
          continue;
        }
      }

      const token = anyToken as MarkedToken;

      switch (token.type) {
        case MarkdownInlineEnum.Em: {
          out += this.renderer.em(token);
          continue;
        }
        case MarkdownInlineEnum.Strong: {
          out += this.renderer.strong(token);
          continue;
        }
        case MarkdownOtherEnum.Escape: {
          out += this.renderer.text(token);
          continue;
        }
        case MarkdownInlineEnum.Link: {
          out += this.renderer.link(token);
          continue;
        }
        case MarkdownInlineEnum.Image: {
          out += this.renderer.image(token);
          continue;
        }
        case MarkdownInlineEnum.Codespan: {
          out += this.renderer.codespan(token);
          continue;
        }
        case MarkdownInlineEnum.Br: {
          out += this.renderer.br(token);
          continue;
        }
        case MarkdownInlineEnum.Del: {
          out += this.renderer.del(token);
          continue;
        }
        case MarkdownOtherEnum.Space: {
          out += this.renderer.space(token);
          continue;
        }
        case MarkdownBlockEnum.Hr: {
          out += this.renderer.hr(token);
          continue;
        }
        case MarkdownBlockEnum.Heading: {
          out += this.renderer.heading(token);
          continue;
        }
        case MarkdownBlockEnum.Code: {
          out += this.renderer.code(token);
          continue;
        }
        case MarkdownBlockEnum.Table: {
          out += this.renderer.table(token);
          continue;
        }
        case MarkdownBlockEnum.Blockquote: {
          out += this.renderer.blockquote(token);
          continue;
        }
        case MarkdownBlockEnum.List: {
          out += this.renderer.list(token);
          continue;
        }
        case MarkdownOtherEnum.Html: {
          out += this.renderer.html(token);
          continue;
        }
        case MarkdownBlockEnum.Paragraph: {
          out += this.renderer.paragraph(token);
          continue;
        }
        case MarkdownOtherEnum.Text: {
          let textToken = token;
          let body = this.renderer.text(textToken);
          while (i + 1 < tokens.length && tokens[i + 1].type === MarkdownOtherEnum.Text) {
            textToken = tokens[++i] as Tokens.Text | Tokens.Tag;
            body += '\n' + this.renderer.text(textToken);
          }
          if (top) {
            out += this.renderer.paragraph({
              type: MarkdownBlockEnum.Paragraph,
              raw: body,
              text: body,
              tokens: [{ type: MarkdownOtherEnum.Text, raw: body, text: body }],
            });
          } else {
            out += body;
          }
          continue;
        }

        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return '';
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }

  /**
   * Parse Inline Tokens
   */
  parseInline(tokens: Token[], renderer?: Renderer | TextRenderer): string {
    renderer = renderer || this.renderer;
    let out = '';

    for (let i = 0; i < tokens.length; i++) {
      const anyToken = tokens[i];

      // Run any renderer extensions
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[anyToken.type]) {
        const ret = this.options.extensions.renderers[anyToken.type].call({ parser: this }, anyToken);
        if (ret !== false || !['escape', 'html', 'link', 'image', 'strong', 'em', 'codespan', 'br', 'del', 'text'].includes(anyToken.type)) {
          out += ret || '';
          continue;
        }
      }

      const token = anyToken as MarkedToken;

      switch (token.type) {
        case MarkdownOtherEnum.Escape: {
          out += renderer.text(token);
          break;
        }
        case MarkdownOtherEnum.Html: {
          out += renderer.html(token);
          break;
        }
        case MarkdownInlineEnum.Link: {
          out += renderer.link(token);
          break;
        }
        case MarkdownInlineEnum.Image: {
          out += renderer.image(token);
          break;
        }
        case MarkdownInlineEnum.Strong: {
          out += renderer.strong(token);
          break;
        }
        case MarkdownInlineEnum.Em: {
          out += renderer.em(token);
          break;
        }
        case MarkdownInlineEnum.Codespan: {
          out += renderer.codespan(token);
          break;
        }
        case MarkdownInlineEnum.Br: {
          out += renderer.br(token);
          break;
        }
        case MarkdownInlineEnum.Del: {
          out += renderer.del(token);
          break;
        }
        case MarkdownOtherEnum.Text: {
          out += renderer.text(token);
          break;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return '';
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
}
