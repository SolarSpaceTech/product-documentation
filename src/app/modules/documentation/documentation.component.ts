import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { MenuItemModel } from '../../../models';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrl: './documentation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationComponent {
  public title$: Observable<string> = this.activatedRoute.data.pipe(
    map(({ menu }) => menu[0].name),
  );

  public menu$: Observable<MenuItemModel[]> = this.activatedRoute.data.pipe(
    map(({ menu }) => menu[0].items),
  );

  public breadcrumbs$: Observable<string[]> = this.activatedRoute.data.pipe(
    map(({ breadcrumbs }) => breadcrumbs?.items),
  );

  public searchIndexes$ = this.activatedRoute.data.pipe(
    map(({ searchIndexes }) => {
      console.log(searchIndexes);

      return searchIndexes;
    }),
  );
  constructor(private readonly activatedRoute: ActivatedRoute) {}
}
