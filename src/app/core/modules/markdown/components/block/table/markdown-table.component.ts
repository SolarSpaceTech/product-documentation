import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Tokens } from 'marked';
import { NgFor, NgIf } from '@angular/common';
import { MarkdownContentDirective } from 'markdown/diretives';

@Component({
  selector: 'table.app-markdown-table',
  styleUrl: './markdown-table.component.scss',
  templateUrl: 'markdown-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, NgFor, MarkdownContentDirective],
})
export class MarkdownTableComponent {
  @Input()
  public set token(value: Tokens.Table) {
    this.header = value.header ?? [];
    this.rows = value.rows ?? [];
  }

  public header: Tokens.TableCell[];
  public rows: Tokens.TableCell[][];
  public align: Tokens.TableCell[][];
}
