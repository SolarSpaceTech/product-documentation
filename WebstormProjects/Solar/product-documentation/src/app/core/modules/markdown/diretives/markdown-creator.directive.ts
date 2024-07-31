import { Directive, Input, ViewContainerRef } from '@angular/core';
import { MarkdownComponentCreatorService } from "../services";
import { Token } from "marked";

@Directive({
  selector: '[markdownCreator]',
})
export class MarkdownCreatorDirective {
  @Input('markdownCreator')
  public set token(token: Token) {
    this.markdownComponentCreatorService.create(token, this.viewContainerRef);
  }

  constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly markdownComponentCreatorService: MarkdownComponentCreatorService
  ) {}
}
