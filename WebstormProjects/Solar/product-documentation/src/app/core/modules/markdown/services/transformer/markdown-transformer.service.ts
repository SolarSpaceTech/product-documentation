import { Injectable } from "@angular/core";
import { marked, Token } from 'marked';
import { MarkdownTokenModel } from "../../models";
import { MarkdownInlineEnum } from "../../enums";

@Injectable()
export class MarkdownTransformerService {
  private readonly TARGET_LINK_RULE = RegExp(marked.Lexer.rules.inline.normal.link.source.replace('^!?', '^{:target=_blank}'));

  public render(tokens: Token[]): string {
    return marked.parser(tokens);
  }

  public transform(content: string): Token[] {
    this.addTargetLinkToParser();
    return marked.lexer(content);
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
}
