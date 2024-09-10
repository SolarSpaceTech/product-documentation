import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Params, RouterLink } from '@angular/router';
import { DecodeUriComponentPipe } from 'app/pipes';
import { IconComponent } from 'app/components/icon';
import { MarkdownTokenModel } from 'markdown/models';

@Component({
  selector: 'app-markdown-link',
  templateUrl: './markdown-link.component.html',
  styleUrls: ['./markdown-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, RouterLink, NgTemplateOutlet, IconComponent, DecodeUriComponentPipe],
})
export class MarkdownLinkComponent implements OnInit, OnChanges {
  @Input()
  public set token(value: MarkdownTokenModel) {
    this.text = value.text;
    this.href = value.href;
  };

  public text = ''
  public href = '';

  protected isInCode: boolean = false;

  private link: HTMLAnchorElement | undefined;

  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly renderer: Renderer2 = inject(Renderer2);

  ngOnInit(): void {
    this.isInCode = this.elementRef.nativeElement.closest('code') !== null;
  }

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
