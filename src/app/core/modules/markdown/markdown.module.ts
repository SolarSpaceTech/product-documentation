import { NgModule } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { MarkdownComponent } from "./markdown.component";
import { MarkdownRendererService, MarkdownTransformerService } from "./services";
import { MarkdownContentDirective } from 'markdown/diretives/markdown-content.directive';
import { MarkdownHtmlElementBuilderService } from 'markdown/services/renderer/markdown-html-element-builder.service';
import { MarkdownOtherElementBuilderService } from 'markdown/services/renderer/markdown-other-element-builder.service';
import { MarkdownComponentBuilderService } from 'markdown/services/renderer/markdown-component-builder.service';

@NgModule({
  imports: [
    AsyncPipe,
    MarkdownContentDirective,
  ],
  declarations: [
    MarkdownComponent,
  ],
  providers: [
    MarkdownTransformerService,
    MarkdownComponentBuilderService,
    MarkdownHtmlElementBuilderService,
    MarkdownOtherElementBuilderService,
    MarkdownRendererService,
  ],
  exports: [
    MarkdownComponent,
  ],
})
export class MarkdownModule {}
