import { ElementRef, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Tokens } from 'marked';
import { BehaviorSubject } from 'rxjs';
import { MarkdownInlineEnum } from 'markdown/enums';
import { TableOfContentsItemModel } from './table-of-contents-item.model';
import { isPlatformBrowser } from '@angular/common';
import { WINDOW } from 'app/providers';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TableOfContentsService {
  private tableListBehaviorSubject = new BehaviorSubject<TableOfContentsItemModel[]>([]);
  public tableList$ = this.tableListBehaviorSubject.asObservable();

  private readonly currentItemFragmentBehaviorSubject = new BehaviorSubject<string>(null);
  public readonly currentItemFragment$ = this.currentItemFragmentBehaviorSubject.asObservable();

  private table: Record<string, number> = {};

  private observer: IntersectionObserver;

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    @Inject(WINDOW) private readonly window: Window,
    private readonly router: Router,
  ) {}

  public addItem(token: Tokens.Heading, elementRef: ElementRef<Element>): void {
    if (token.depth === 1) {
      this.clear();
    }

    const linkToken = token.tokens.find(({ type }) => type === MarkdownInlineEnum.Link);

    if (linkToken?.type !== MarkdownInlineEnum.Link) {
      return;
    }
    const tableList = this.tableListBehaviorSubject.getValue();
    this.table[linkToken.href] = tableList.length;
    if (this.isBrowser) {
      this.observer.observe(elementRef.nativeElement);
    }
    tableList.push({
      title: linkToken.title ?? linkToken.text,
      fragment: linkToken.href,
      level: token.depth,
      element: elementRef.nativeElement as HTMLElement,
    });
  }

  public scrollToFragment(fragment: string, behavior: ScrollBehavior = 'smooth'): void {
    if (behavior !== 'smooth') {
      this.currentItemFragmentBehaviorSubject.next(fragment);
    }
    const tableItemIndex = this.table[fragment];
    const tableItem = this.tableListBehaviorSubject.getValue()[tableItemIndex];
    this.window.scroll({ top: tableItem.element.offsetTop - 88, behavior });
  }

  private clear(): void {
    this.tableListBehaviorSubject.next([]);
    if (this.isBrowser) {
      this.reloadIntersectionObserver();
    }

  }

  private reloadIntersectionObserver(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.rootBounds) {
            return;
          }

          const id = entry.target.id;

          let activeItemIndex = this.table[id];
          if (!entry.isIntersecting && entry.boundingClientRect.top - entry.rootBounds.top > 0) {
            --activeItemIndex;
          }

          let fragment = activeItemIndex >= 0 ? this.tableListBehaviorSubject.getValue()[activeItemIndex].fragment : null;
          this.currentItemFragmentBehaviorSubject.next(fragment);
        })
      },
      {
        rootMargin: '-10% 0% -80% 0%',
        threshold: 0,
      }
    );
  }
}
