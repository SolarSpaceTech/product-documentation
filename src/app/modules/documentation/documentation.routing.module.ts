import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DocumentationComponent } from './documentation.component';
import { DocumentationContentComponent } from './components';
import {
  documentationResolver,
  documentationBreadcrumbsResolver,
  documentationMenuResolver,
} from './resolvers';
import { documentationSearchIndexesResolver } from './resolvers/documentation-search-indexes.resolver';

const routes: Routes = [
  {
    path: '',
    component: DocumentationComponent,
    resolve: {
      menu: documentationMenuResolver,
      breadcrumbs: documentationBreadcrumbsResolver,
      searchIndexes: documentationSearchIndexesResolver,
    },
    children: [
      {
        path: '**',
        component: DocumentationContentComponent,
        resolve: {
          document: documentationResolver,
        },
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class DocumentationRoutingModule {}
