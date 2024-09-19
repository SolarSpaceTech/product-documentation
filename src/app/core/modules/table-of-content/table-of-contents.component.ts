import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { TableOfContentsService } from './table-of-contents.service';
import { TableOfContentsItemModel } from './table-of-contents-item.model';

@Component({
  selector: 'app-table-of-contents',
  templateUrl: './table-of-contents.component.html',
  styleUrl: './table-of-contents.component.scss',
  standalone: true,
  imports: [AsyncPipe, NgFor, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableOfContentsComponent {
  public table$: Observable<TableOfContentsItemModel[]> = this.tableOfContentService.table$;

  constructor(private readonly tableOfContentService: TableOfContentsService) {}
}
