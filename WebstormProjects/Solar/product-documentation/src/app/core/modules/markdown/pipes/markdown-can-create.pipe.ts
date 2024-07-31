import { Pipe, PipeTransform } from '@angular/core';
import { MarkdownComponentCreatorService } from "../services";

@Pipe({
  name: 'markdownCanCreate',
})
export class MarkdownCanCreatePipe implements PipeTransform {
  transform(tokenType: string): boolean {
    return this.markdownComponentCreatorService.canCreate(tokenType);
  }

  constructor(private readonly markdownComponentCreatorService: MarkdownComponentCreatorService) {}

}
