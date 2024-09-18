import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { SCInputModule } from '@ui-kit/input/input.module';
import { SCDecoratorsModule } from '@ui-kit/decorators/decorators.module';
import { SCIconModule } from '@ui-kit/icon/icon.module';
import { SCCheckboxModule } from '@ui-kit/checkbox/checkbox.module';
import { SCSelectModule } from '@ui-kit/select/select.module';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LanguageFormControlComponent } from '../form-controls/language/language-form-control.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    SCInputModule,
    SCDecoratorsModule,
    SCInputModule,
    SCIconModule,
    SCCheckboxModule,
    SCSelectModule,
    ReactiveFormsModule,
    LanguageFormControlComponent,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { ngSkipHydration: 'true' },
})
export class HeaderComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: string) {}
  protected themeControl = new FormControl<boolean>(true);
  protected languageControl = new FormControl('en');

  get isBrowserOnly(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  public ngOnInit(): void {
    if (this.isBrowserOnly) {
      this.languageControl.setValue(window.location.pathname.split('/')[1]);
    }
  }
}
