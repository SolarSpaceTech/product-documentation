import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { MarkdownTokenModel } from "../../../models";

@Component({
  selector: 'app-markdown-code',
  templateUrl: './markdown-code.component.html',
  styleUrl: './markdown-code.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkdownCodeComponent {
  @Input()
  public token: MarkdownTokenModel;

  public copyToClipboard(code: string): void {
    void navigator.clipboard.writeText(code);
  }
}
