import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'languageImage',
  standalone: true,
})
export class LanguageImagePipe implements PipeTransform {
  /** @TODO: типы */
  public transform(language: any): string {
    return `assets/languages/${language}.png`;
  }
}
