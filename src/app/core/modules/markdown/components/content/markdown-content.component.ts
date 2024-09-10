import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Token } from 'marked';
import { NgFor, NgIf } from '@angular/common';
import { MarkdownCanCreatePipe } from '../../pipes';
import { MarkdownParserPipe } from '../../pipes/markdown-parser.pipe';
import { MarkdownCreatorDirective } from '../../diretives';

@Component({
  selector: 'app-markdown-content',
  templateUrl: './markdown-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, NgFor, MarkdownCanCreatePipe, MarkdownParserPipe, MarkdownCreatorDirective],
  encapsulation: ViewEncapsulation.None,
})
export class MarkdownContentComponent {
  @Input()
  public tokens: Token[] = [];
}
