import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { SCCheckboxModule } from '@ui-kit/checkbox/checkbox.module';
import { SCSelectModule } from '@ui-kit/select/select.module';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LanguageFormControlComponent } from '../form-controls/language/language-form-control.component';
import { Theme, ThemesService } from 'app/services/themes';
import { distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SearchComponent } from '../search/search/search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    SCCheckboxModule,
    SCSelectModule,
    ReactiveFormsModule,
    LanguageFormControlComponent,
    FormsModule,
    SearchComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { ngSkipHydration: 'true' },
})
export class HeaderComponent {
  protected themeControl = new FormControl<boolean>(true);
  protected languageControl = new FormControl('en');

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private themesService: ThemesService,
    private destroyRef: DestroyRef,
  ) {}

  get isBrowserOnly(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  public ngOnInit(): void {
    if (this.isBrowserOnly) {
      this.languageControl.setValue(window.location.pathname.split('/')[1]);

      this.themeControl.valueChanges
        .pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
        .subscribe((isDarkTheme) => {
          this.themesService.setTheme(isDarkTheme ? Theme.DARK : Theme.LIGHT);
        });

      this.themesService.currentTheme$
        .pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
        .subscribe((currentTheme) => {
          this.themeControl.patchValue(currentTheme === Theme.DARK);
        });
    }
  }
}
