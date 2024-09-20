import {
  Directive,
  ElementRef,
  HostBinding,
  inject,
  Input,
} from '@angular/core';
import { Tokens } from 'marked';
import { MarkdownContentDirective } from 'markdown/diretives';
import { MarkdownInlineEnum } from 'markdown/enums';
import { TableOfContentsService } from 'app/core/modules/table-of-content/table-of-contents.service';

@Directive()
export class MarkdownHeadingDirective extends MarkdownContentDirective {
  protected readonly elementRef = inject(ElementRef);
  private readonly tableOfContentService = inject(TableOfContentsService);


  @Input()
  public set token(value: Tokens.Heading) {
    this.tableOfContentService.addItem(value, this.elementRef);
    const linkToken = value.tokens.find(({ type }) => type === MarkdownInlineEnum.Link) as Tokens.Link;
    if (!!linkToken) {
      this.id = linkToken.href;
      this.tokens = linkToken.tokens;
    } else {
      this.tokens = value.tokens;
    }
  }

  @HostBinding('attr.id')
  public id: string;
}
