import { RouterModule, Routes } from '@angular/router';
import { NgModule} from '@angular/core';
import { DocumentationComponent } from "./documentation.component";
import { DocumentationContentComponent } from "./components";
import { documentationResolver, documentationBreadcrumbsResolver, documentationMenuResolver } from "./resolvers";

const routes: Routes = [
  {
    path: '',
    component: DocumentationComponent,
    resolve: {
      menu: documentationMenuResolver,
      breadcrumbs: documentationBreadcrumbsResolver,
    },
    children: [
      {
        path: '**',
        component: DocumentationContentComponent,
        resolve: {
          document: documentationResolver,
        }
      }
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class DocumentationRoutingModule {}
