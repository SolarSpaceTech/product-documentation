import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from "@angular/router";
import { DocumentationComponent } from './documentation.component';
import { DocumentationRoutingModule } from "./documentation.routing.module";
import { MenuModule } from "app/core/modules/menu";
import { MarkdownModule } from "app/core/modules/markdown/markdown.module";
import { DocumentationContentComponent } from "./components";
import { BreadcrumbsComponent } from 'app/components/breadcrumbs/breadcrumbs.component';
import { TableOfContentsComponent } from 'app/core/modules/table-of-content/table-of-contents.component';


@NgModule({
  declarations: [
    DocumentationComponent,
    DocumentationContentComponent,
  ],
  imports: [
    CommonModule,
    DocumentationRoutingModule,
    MarkdownModule,
    RouterOutlet,
    MenuModule,
    BreadcrumbsComponent,
    TableOfContentsComponent,
  ],
})
export class DocumentationModule { }
