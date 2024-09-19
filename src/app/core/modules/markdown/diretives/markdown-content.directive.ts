import {
  Directive,
  ElementRef, inject,
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
  private readonly elementRef: ElementRef = inject(ElementRef);
  private readonly renderer: Renderer2 = inject(Renderer2);
  private readonly injector: Injector = inject(Injector);
  private readonly viewContainerRef: ViewContainerRef = inject(ViewContainerRef);
  private readonly markdownRendererService: MarkdownRendererService = inject(MarkdownRendererService);

  @Input('markdownContent')
  public tokens: Token[] = [];

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
