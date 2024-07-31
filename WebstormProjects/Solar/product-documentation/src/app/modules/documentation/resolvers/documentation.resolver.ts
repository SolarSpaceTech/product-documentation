import { ActivatedRouteSnapshot, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { ContentItemModel } from "../../../../models";
import { ContentApiService } from '../../../core/modules/content';

export function documentationResolver(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<ContentItemModel> {
  const contentApiService = inject(ContentApiService);
  const path: string = state.url.replace('/', '');
  return contentApiService.getDocument(path);
}
