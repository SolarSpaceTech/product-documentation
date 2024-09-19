import { Injectable } from '@angular/core';
import { Tokens } from 'marked';
import { BehaviorSubject } from 'rxjs';
import { MarkdownInlineEnum } from 'markdown/enums';
import { TableOfContentsItemModel } from './table-of-contents-item.model';

@Injectable({
  providedIn: 'root',
})
export class TableOfContentsService {
  private tableBehaviorSubject = new BehaviorSubject<TableOfContentsItemModel[]>([]);
  public table$ = this.tableBehaviorSubject.asObservable();

  public addItem(token: Tokens.Heading): void {
    if (token.depth === 1) {
      this.clear();
    }

    const linkToken = token.tokens.find(({ type }) => type === MarkdownInlineEnum.Link);

    if (linkToken?.type === MarkdownInlineEnum.Link) {
      const table = this.tableBehaviorSubject.getValue();
      table.push({
        title: linkToken.title ?? linkToken.text,
        fragment: linkToken.href,
        level: token.depth,
      });
    }
  }

  private clear(): void {
    this.tableBehaviorSubject.next([]);
  }
}
