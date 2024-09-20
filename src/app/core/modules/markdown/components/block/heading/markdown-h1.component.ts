import { Component } from '@angular/core';

import { MarkdownHeadingDirective } from './markdown-heading.directive';

@Component({
  selector: 'h1.markdown-heading',
  template: ``,
  standalone: true,
})
export class MarkdownH1Component extends MarkdownHeadingDirective {}
