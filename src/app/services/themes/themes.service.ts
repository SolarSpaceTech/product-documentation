import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Theme } from './theme';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemesService {
  private readonly LAST_THEME_STORAGE_KEY = 'theme';
  private readonly DEFAULT_THEME: Theme = Theme.DARK;

  private currentThemeBehaviorSubject = new BehaviorSubject<Theme>(
    this.DEFAULT_THEME,
  );
  public currentTheme$: Observable<Theme> =
    this.currentThemeBehaviorSubject.asObservable();

  public get currentTheme(): Theme {
    return this.currentThemeBehaviorSubject.getValue();
  }

  constructor(
    private readonly storageService: StorageService,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  public init(): void {
    const theme = this.storageService.getValue(
      this.LAST_THEME_STORAGE_KEY,
      this.DEFAULT_THEME,
    ) as Theme;
    this.applyThemeToDocumentBody(theme);
    this.currentThemeBehaviorSubject.next(theme);
  }

  public setTheme(theme: Theme): void {
    this.storageService.setValue(this.LAST_THEME_STORAGE_KEY, theme);
    this.applyThemeToDocumentBody(theme);
    this.currentThemeBehaviorSubject.next(theme);
  }

  private applyThemeToDocumentBody(theme: Theme): void {
    const body = this.document.getElementsByTagName('body')[0];
    body.classList.remove(Object.values(Theme).find((t) => t !== theme));
    body.classList.add(theme);
  }
}
