import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ContentApiService } from './core/modules/content';
import { Observable } from 'rxjs';
import { ContentItemModel } from '../models';
import { ThemesService } from './services/themes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public languages$: Observable<ContentItemModel[]> =
    this.contentApiService.getDirectory('');

  constructor(
    private readonly contentApiService: ContentApiService,
    private themesService: ThemesService,
  ) {}

  public ngOnInit(): void {
    this.themesService.init();
  }
}
