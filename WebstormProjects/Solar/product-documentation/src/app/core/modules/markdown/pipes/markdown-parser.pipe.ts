import {Pipe, PipeTransform} from "@angular/core";
import {MarkdownTokenModel} from "../models";
import {MarkdownTransformerService} from "../services";
import {Token, TokensList} from "marked";

@Pipe({
  name: 'markdownParser',
})
export class MarkdownParserPipe implements PipeTransform {
  constructor(private readonly markdownTransformerService: MarkdownTransformerService) {}

  public transform(tokens: Token[]): string {
    return this.markdownTransformerService.render(tokens);
  }
}
