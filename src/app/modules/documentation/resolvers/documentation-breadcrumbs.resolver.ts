import { ActivatedRouteSnapshot, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { BreadcrumbsModel } from "../../../../models";
import { ContentApiService } from 'app/core/modules/content';

export function documentationBreadcrumbsResolver(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<BreadcrumbsModel> {
  const contentApiService = inject(ContentApiService);
  const path: string = state.url.replace('/', '');
  return contentApiService.getBreadcrumbs(path);
}
