import { ActivatedRouteSnapshot, MaybeAsync, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { ContentApiService } from '../../../core/modules/content';
import { ContentItemModel } from '../../../../models';

export function languagesResolver(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<ContentItemModel[]> {
  const contentApiService = inject(ContentApiService);
  return contentApiService.getDirectory('');
};
