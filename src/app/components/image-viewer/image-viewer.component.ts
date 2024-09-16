import {
  ChangeDetectionStrategy,
  Component, EventEmitter, HostListener,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrl: './image-viewer.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageViewerComponent {
  @Input()
  public clickViewer = new EventEmitter<void>();

  @Input()
  public src: string = '';

  @Input()
  public title: string = '';

  @Input()
  public alt: string = '';

  @HostListener('click')
  private click(): void {
    this.clickViewer.emit();
  }
}
