import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { MarkdownTokenModel } from 'markdown/models';
import { MarkdownContentComponent } from 'markdown/components/content';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-markdown-heading',
  templateUrl: './markdown-heading.component.html',
  styleUrl: './markdown-heading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MarkdownContentComponent,
    NgTemplateOutlet
  ],
})
export class MarkdownHeadingComponent {
  public items: MarkdownTokenModel[] = [];

  public level = 1;

  @Input()
  public set token(value: MarkdownTokenModel) {
    this.level = value.depth;
    this.items = value?.tokens ?? [];
  }
}
