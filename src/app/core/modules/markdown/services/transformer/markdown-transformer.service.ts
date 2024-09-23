import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { marked, Token } from 'marked';
import { WhiteLabelApiService } from 'app/core/modules/white-label';
import { Observable, map, defer, of, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class MarkdownTransformerService {
  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private readonly whiteLabelApiService: WhiteLabelApiService
  ) {}

  public transform(content: string): Observable<Token[]> {
    return defer(
      () => isPlatformBrowser(this.platformId) && this.hasContentVariables(content)
        ? this.whiteLabelApiService.get()
        : of({})
    ).pipe(
      map((whiteLabel) => marked.lexer(this.setWhiteLabelVariables(content, whiteLabel))),
    );
  }

  private hasContentVariables(content: string): boolean {
    console.log()
    return content.search(/\{\{ [a-zA-z0-9]* \}\}/) > -1;
  }

  private setWhiteLabelVariables(content: string, config: Record<string, any>, parentKey?: string): string {
    return Array.from(Object.entries(config)).reduce((result, [key, value]) => {
      const currentKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof value === 'object') {
        return this.setWhiteLabelVariables(result, value, currentKey);
      }
      return result.replaceAll(`{{ ${currentKey} }}`, value);
    }, content);
  }
}
