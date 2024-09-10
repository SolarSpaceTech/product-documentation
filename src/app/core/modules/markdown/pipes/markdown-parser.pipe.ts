import {Pipe, PipeTransform} from "@angular/core";
import {MarkdownTransformerService} from "../services";
import {Token} from "marked";

@Pipe({
  name: 'markdownParser',
  standalone: true,
})
export class MarkdownParserPipe implements PipeTransform {
  constructor(private readonly markdownTransformerService: MarkdownTransformerService) {}

  public transform(tokens: Token[], inline = false): string {
    return this.markdownTransformerService.render(tokens, inline);
  }
}
