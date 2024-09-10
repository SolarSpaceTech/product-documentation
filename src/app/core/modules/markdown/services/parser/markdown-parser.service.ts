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
import { MarkdownInlineEnum } from 'markdown/enums';
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
        name: 'targetLink',
        level: 'inline',
        start: (src: string): number => src.match(/^{:target=_blank}/)?.index,
        tokenizer: (src: string): any => {
          const cap = this.TARGET_LINK_RULE.exec(src);
          if (cap) {
            return {
              type: MarkdownInlineEnum.TargetLink,
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
        case 'em': {
          out += this.renderer.em(token);
          continue;
        }
        case 'strong': {
          out += this.renderer.strong(token);
          continue;
        }
        case 'escape': {
          out += this.renderer.text(token);
          continue;
        }
        case 'link': {
          out += this.renderer.link(token);
          continue;
        }
        case 'image': {
          out += this.renderer.image(token);
          continue;
        }
        case 'codespan': {
          out += this.renderer.codespan(token);
          continue;
        }
        case 'br': {
          out += this.renderer.br(token);
          continue;
        }
        case 'del': {
          out += this.renderer.del(token);
          continue;
        }
        case 'space': {
          out += this.renderer.space(token);
          continue;
        }
        case 'hr': {
          out += this.renderer.hr(token);
          continue;
        }
        case 'heading': {
          out += this.renderer.heading(token);
          continue;
        }
        case 'code': {
          out += this.renderer.code(token);
          continue;
        }
        case 'table': {
          out += this.renderer.table(token);
          continue;
        }
        case 'blockquote': {
          out += this.renderer.blockquote(token);
          continue;
        }
        case 'list': {
          out += this.renderer.list(token);
          continue;
        }
        case 'html': {
          out += this.renderer.html(token);
          continue;
        }
        case 'paragraph': {
          out += this.renderer.paragraph(token);
          continue;
        }
        case 'text': {
          let textToken = token;
          let body = this.renderer.text(textToken);
          while (i + 1 < tokens.length && tokens[i + 1].type === 'text') {
            textToken = tokens[++i] as Tokens.Text | Tokens.Tag;
            body += '\n' + this.renderer.text(textToken);
          }
          if (top) {
            out += this.renderer.paragraph({
              type: 'paragraph',
              raw: body,
              text: body,
              tokens: [{ type: 'text', raw: body, text: body }],
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
        case 'escape': {
          out += renderer.text(token);
          break;
        }
        case 'html': {
          out += renderer.html(token);
          break;
        }
        case 'link': {
          out += renderer.link(token);
          break;
        }
        case 'image': {
          out += renderer.image(token);
          break;
        }
        case 'strong': {
          out += renderer.strong(token);
          break;
        }
        case 'em': {
          out += renderer.em(token);
          break;
        }
        case 'codespan': {
          out += renderer.codespan(token);
          break;
        }
        case 'br': {
          out += renderer.br(token);
          break;
        }
        case 'del': {
          out += renderer.del(token);
          break;
        }
        case 'text': {
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
