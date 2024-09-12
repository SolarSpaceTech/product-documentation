import {
  Directive,
  ElementRef,
  Injector,
  Input,
  OnInit,
  Renderer2,
  ViewContainerRef
} from '@angular/core';
import { Token } from 'marked';
import { MarkdownRendererService } from 'markdown/services';

@Directive({
  selector: '[markdownContent]',
  standalone: true,
})
export class MarkdownContentDirective implements OnInit {
  @Input('markdownContent')
  public tokens: Token[] = [];

  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2,
    private readonly injector: Injector,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly markdownRendererService: MarkdownRendererService,
  ) {}

  public ngOnInit(): void {
    this.markdownRendererService.render({
      tokens: this.tokens,
      parentElement: this.elementRef.nativeElement,
      renderer: this.renderer,
      injector: this.injector,
      viewContainerRef: this.viewContainerRef,
    });
  }
}
