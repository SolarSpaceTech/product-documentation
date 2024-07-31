import { ActivatedRouteSnapshot, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { MenuItemModel } from "../../../../models";
import { ContentApiService } from '../../../core/modules/content';

export function documentationMenuResolver(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<MenuItemModel[]> {
  const contentApiService = inject(ContentApiService);
  const documentationPath = state.url.split('/').slice(1, 3).join('/');
  return contentApiService.getMenu(documentationPath);
}
