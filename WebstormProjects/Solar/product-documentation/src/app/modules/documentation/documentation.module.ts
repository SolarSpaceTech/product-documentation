import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from "@angular/router";
import { DocumentationComponent } from './documentation.component';
import { DocumentationRoutingModule } from "./documentation.routing.module";
import { MenuModule } from "../../core/modules/menu";
import { MarkdownModule } from "../../core/modules/markdown/markdown.module";
import { DocumentationContentComponent } from "./components";


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
  ],
})
export class DocumentationModule { }
