import { Component } from '@angular/core';

import { MarkdownHeadingDirective } from './markdown-heading.directive';
import { MarkdownContentDirective } from 'markdown/diretives';

@Component({
  selector: 'h1.markdown-heading',
  template: ``,
  standalone: true,
  imports: [
    MarkdownContentDirective
  ],
})
export class MarkdownH1Component extends MarkdownHeadingDirective {}
