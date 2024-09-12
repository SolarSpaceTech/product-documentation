import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Tokens } from 'marked';

@Component({
  template: `<div [innerHTML]="token?.text"></div>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MarkdownHtmlComponent {
  @Input()
  public token: Tokens.HTML;
}
