import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconComponent } from 'app/components/icon';
import { Tokens } from 'marked';

@Component({
  selector: 'app-markdown-code',
  templateUrl: './markdown-code.component.html',
  styleUrl: './markdown-code.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [IconComponent]
})
export class MarkdownCodeComponent {
  @Input()
  public token: Tokens.Code;

  public copyToClipboard(code: string): void {
    void navigator.clipboard.writeText(code);
  }
}
