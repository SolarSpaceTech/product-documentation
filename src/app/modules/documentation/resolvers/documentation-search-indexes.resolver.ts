import {
  ActivatedRouteSnapshot,
  MaybeAsync,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { ContentApiService } from 'app/core/modules/content';

// @TODO: model
export function documentationSearchIndexesResolver(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): MaybeAsync<any> {
  const contentApiService = inject(ContentApiService);
  const lang: string = state.url.split('/')[1];

  return contentApiService.getSearchIndexes(lang);
}
