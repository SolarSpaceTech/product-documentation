import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Injector,
  Input,
  Renderer2, SkipSelf,
  ViewContainerRef
} from '@angular/core';
import { Tokens } from 'marked';
import { ImageViewerComponent } from 'app/components/image-viewer/image-viewer.component';

@Component({
  selector: 'img.markdown-image',
  styleUrl: './markdown-image.component.scss',
  templateUrl: './markdown-image.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class MarkdownImageComponent {
  @Input()
  public set token(value: Tokens.Image) {
    this.src = value.href;
    this.title = value.title;
    this.alt = value.text;
  }

  @HostListener('click')
  private imageClick(): void {
    this.openViewer();
  }

  @HostBinding('attr.src')
  public src: string = '';

  @HostBinding('attr.title')
  public title: string = '';

  @HostBinding('attr.alt')
  public alt: string = '';

  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2,
    @SkipSelf() private readonly viewContainerRef: ViewContainerRef,
    private readonly injector: Injector,
  ) {}

  private openViewer(): void {
    const imageViewerComponent = this.viewContainerRef.createComponent(
      ImageViewerComponent,
      { injector: this.injector },
    );

    imageViewerComponent.instance.src = this.src;
    imageViewerComponent.instance.title = this.title;
    imageViewerComponent.instance.alt = this.alt;

    const viewerSubscriber = imageViewerComponent.instance.clickViewer.subscribe(() => {
      viewerSubscriber.unsubscribe();
      imageViewerComponent.destroy();
    });
  }
}
