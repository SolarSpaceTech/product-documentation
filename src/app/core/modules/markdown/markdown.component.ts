import { ChangeDetectionStrategy, Component, inject, Input, ViewEncapsulation } from '@angular/core';
import { MarkdownTransformerService } from "./services";
import { ReplaySubject } from "rxjs";
import { Token } from "marked";
import { MarkdownContentDirective } from 'markdown/diretives';

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrl: './markdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { ngSkipHydration: 'true' },
  encapsulation: ViewEncapsulation.None,
})
export class MarkdownComponent extends MarkdownContentDirective {
  private readonly markdownTransformerService = inject(MarkdownTransformerService);

  @Input()
  public set content(value: string) {
    this.markdownTransformerService.transform(value).subscribe((markdownTokens) => {
      this.tokens$.next(markdownTokens);
    });
  }

  public tokens$ = new ReplaySubject<Token[]>(1);
}
