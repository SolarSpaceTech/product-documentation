import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Tokens } from 'marked';
import { SCIconModule } from '@ui-kit/icon/icon.module';

@Component({
  selector: 'app-markdown-code',
  templateUrl: './markdown-code.component.html',
  styleUrl: './markdown-code.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SCIconModule]
})
export class MarkdownCodeComponent {
  @Input()
  public token: Tokens.Code;

  public copyToClipboard(code: string): void {
    void navigator.clipboard.writeText(code);
  }
}
