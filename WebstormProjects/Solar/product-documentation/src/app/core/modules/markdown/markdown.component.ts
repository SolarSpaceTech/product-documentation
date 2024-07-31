import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { MarkdownTransformerService } from "./services";
import { ReplaySubject } from "rxjs";
import { Token } from "marked";

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrl: './markdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { ngSkipHydration: 'true' },
  encapsulation: ViewEncapsulation.None,
})
export class MarkdownComponent {
  @Input()
  public set content(value: string) {
    const markdownTokens = this.markdownTransformerService.transform(value);
    this.tokens$.next(markdownTokens);
  }

  public tokens$ = new ReplaySubject<Token[]>(1);

  constructor(
    private readonly markdownTransformerService: MarkdownTransformerService,
  ) {}
}
