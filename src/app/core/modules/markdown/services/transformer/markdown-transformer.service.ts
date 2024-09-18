import { Injectable } from "@angular/core";
import { marked, Token } from 'marked';

@Injectable()
export class MarkdownTransformerService {
  public transform(content: string): Token[] {
    return marked.lexer(content);
  }
}
