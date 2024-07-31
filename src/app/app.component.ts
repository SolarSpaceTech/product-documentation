import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContentApiService } from './core/modules/content';
import { Observable } from 'rxjs';
import { ContentItemModel } from '../models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public languages$: Observable<ContentItemModel[]> = this.contentApiService.getDirectory('');

  constructor(private readonly contentApiService: ContentApiService) {}
}
