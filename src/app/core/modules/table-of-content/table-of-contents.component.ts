import { ChangeDetectionStrategy, Component, DestroyRef, Inject, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, IsActiveMatchOptions, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { TableOfContentsService } from './table-of-contents.service';
import { TableOfContentsItemModel } from './table-of-contents-item.model';

@Component({
  selector: 'app-table-of-contents',
  templateUrl: './table-of-contents.component.html',
  styleUrl: './table-of-contents.component.scss',
  standalone: true,
  imports: [AsyncPipe, NgFor, RouterLink, RouterLinkActive, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableOfContentsComponent {
  public table$: Observable<TableOfContentsItemModel[]> = this.tableOfContentService.tableList$.pipe(
    tap((table) => {
      if (table?.length > 0) {
        const activeItem = table.find((tableItem) => tableItem.fragment === this.activatedRoute.snapshot.fragment);
        if (activeItem) {
          this.tableOfContentService.scrollToFragment(activeItem.fragment, 'auto');
        }
      }
    }),
  );
  public currentItem$ = this.tableOfContentService.currentItemFragment$.pipe(
    tap((fragment) => {
      this.router.navigate([], fragment ? { fragment } : {});
    }),
  );

  public readonly routerLinkActiveOptions: IsActiveMatchOptions = {
    matrixParams: 'ignored',
    queryParams: 'ignored',
    paths: 'exact',
    fragment: 'exact'
  };

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly tableOfContentService: TableOfContentsService,
  ) {}

  public scrollTo(tableItem: TableOfContentsItemModel): void {
    this.tableOfContentService.scrollToFragment(tableItem.fragment);
  }
}
