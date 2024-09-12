import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnChanges,
  Renderer2,
} from '@angular/core';
import { Params, RouterLink } from '@angular/router';
import { DecodeUriComponentPipe } from 'app/pipes';
import { IconComponent } from 'app/components/icon';
import { MarkdownTokenModel } from 'markdown/models';
import { Token } from 'marked';
import { MarkdownContentDirective } from 'markdown/diretives';

@Component({
  selector: 'app-markdown-link',
  templateUrl: './markdown-link.component.html',
  styleUrls: ['./markdown-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, RouterLink, NgTemplateOutlet, IconComponent, DecodeUriComponentPipe, MarkdownContentDirective],
})
export class MarkdownLinkComponent implements OnChanges {
  @Input()
  public set token(value: MarkdownTokenModel) {
    this.tokens = value.tokens ?? [];
    this.href = value.href;
  };

  public tokens: Token[];
  public href = '1';

  private link: HTMLAnchorElement | undefined;

  private readonly renderer: Renderer2 = inject(Renderer2);

  ngOnChanges(): void {
    this.link = this.renderer.createElement('a') as HTMLAnchorElement;
    this.link.href = this.href;
  }

  get isExternalLink(): boolean {
    return this.href.startsWith('http');
  }

  get path(): string {
    return (!this.isExternalLink ? this.link?.pathname : this.href) ?? '';
  }

  get fragment(): string | undefined {
    return this.link?.hash.replace(/^#/, '') || undefined;
  }

  get queryParams(): Params {
    return Object.fromEntries(
      new URLSearchParams(this.link?.search.replace(/^\?/, '') ?? '').entries(),
    );
  }
}
