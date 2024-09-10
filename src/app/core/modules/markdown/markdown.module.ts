import { NgModule } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { MarkdownComponent } from "./markdown.component";
import { MarkdownComponentCreatorService, MarkdownTransformerService } from "./services";
import { MarkdownContentComponent } from './components/content';

@NgModule({
  imports: [
    AsyncPipe,
    MarkdownContentComponent,
  ],
  declarations: [
    MarkdownComponent,
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
