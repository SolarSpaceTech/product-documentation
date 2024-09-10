import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownTokenModel } from 'markdown/models';
import { MarkdownContentComponent } from 'markdown/components/content';

@Component({
  selector: 'app-markdown-paragraph',
  templateUrl: './markdown-paragraph.component.html',
  styleUrl: './markdown-paragraph.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MarkdownContentComponent
  ],
})
export class MarkdownParagraphComponent {
  public items: MarkdownTokenModel[] = [];

  @Input()
  public set token(value: MarkdownTokenModel) {
    this.items = value?.tokens ?? [];
  }
}
