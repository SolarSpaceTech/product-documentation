import {Pipe, PipeTransform, SecurityContext} from '@angular/core';
import {DomSanitizer, SafeValue} from "@angular/platform-browser";

@Pipe({
  name: 'sanitizeHtml',
  standalone: true
})
export class SanitizeHtmlPipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {}

  transform(untrustedHtml: string): SafeValue {
    return this._sanitizer.bypassSecurityTrustUrl(untrustedHtml);
  }
}
