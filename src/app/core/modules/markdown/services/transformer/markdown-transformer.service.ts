import { Injectable } from "@angular/core";
import { marked, Token } from 'marked';
import { MarkdownParserService } from '../parser/markdown-parser.service';

@Injectable()
export class MarkdownTransformerService {
  constructor(private readonly markdownParserService: MarkdownParserService) {}

  public render(tokens: Token[], inline = false): string {
    if (inline) {
      return this.markdownParserService.parseInline(tokens);
    }
    return this.markdownParserService.parse(tokens);
  }

  public transform(content: string): Token[] {
    return marked.lexer(content);
  }
}
