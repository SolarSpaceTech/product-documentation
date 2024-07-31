import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MarkdownCreatorDirective } from "./diretives";
import { MarkdownCanCreatePipe } from "./pipes";
import { MarkdownParserPipe } from "./pipes/markdown-parser.pipe";
import { MarkdownComponent } from "./markdown.component";
import { MarkdownComponentCreatorService, MarkdownTransformerService } from "./services";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    MarkdownComponent,
    MarkdownCreatorDirective,
    MarkdownCanCreatePipe,
    MarkdownParserPipe,
  ],
  providers: [
    MarkdownComponentCreatorService,
    MarkdownTransformerService,
  ],
  exports: [
    MarkdownComponent,
  ],
})
export class MarkdownModule {}
