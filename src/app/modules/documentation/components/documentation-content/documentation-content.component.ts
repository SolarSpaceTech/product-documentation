import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { map, tap } from 'rxjs';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { MenuStateService } from '../../../../core/modules/menu/services';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-documentation-content',
  templateUrl: './documentation-content.component.html',
  styleUrl: './documentation-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationContentComponent implements OnInit {
  public markdown$ = this.activatedRoute.data.pipe(
    map(({ document }) => document?.content),
  );

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly menuStateService: MenuStateService,
    private readonly destroyRef: DestroyRef,
  ) {}

  private currentLangPath = toSignal(
    this.activatedRoute.pathFromRoot.at(1).url,
  )().at(0).path;

  public ngOnInit(): void {
    this.activatedRoute.url
      .pipe(
        map((segments: UrlSegment[]) => {
          return [
            this.currentLangPath,
            'documentation',
            ...segments.map((segment) => segment.path),
          ];
        }),
        tap((path: string[]) => {
          console.log(path, 'path');

          this.menuStateService.initMenuState(path);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
