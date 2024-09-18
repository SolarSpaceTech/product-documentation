import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SCDecoratorsModule } from '@ui-kit/decorators/decorators.module';
import {
  SCDropdownComponent,
  SCDropdownModule,
} from '@ui-kit/dropdown/dropdown.module';
import { SCIconModule } from '@ui-kit/icon/icon.module';
import { SCInputIconsModule } from '@ui-kit/input/input.module';
import { SCPipesModule } from '@ui-kit/pipes/pipes.module';
import {
  MAX_HEIGHT,
  OPTION_LIST_TOKEN,
  SCSelectModule,
} from '@ui-kit/select/select.module';
import { ObjectValuesPipe } from 'app/pipes/object-values.pipe';
import { LanguageImagePipe } from 'app/pipes/language-image.pipe';

enum Language {
  RU = 'ru',
  EN = 'en',
}

@Component({
  selector: 'app-language-form-control',
  standalone: true,
  imports: [
    NgForOf,
    SCInputIconsModule,
    SCDropdownModule,
    SCSelectModule,
    SCPipesModule,
    SCDecoratorsModule,
    SCIconModule,
    LanguageImagePipe,
    ObjectValuesPipe,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './language-form-control.component.html',
  styleUrl: './language-form-control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OPTION_LIST_TOKEN,
      useExisting: LanguageFormControlComponent,
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: LanguageFormControlComponent,
      multi: true,
    },
  ],
})
export class LanguageFormControlComponent implements ControlValueAccessor {
  @ViewChild('dropdown')
  private dropdown: SCDropdownComponent;

  protected readonly maxHeight = MAX_HEIGHT;
  protected readonly Language = Language;

  public multiple = false;

  public optionsItems: Array<Language> = Array.from(Object.values(Language));

  private onChange: (value: Language) => void = () => {};

  protected currentLanguage = signal(null);

  public writeValue(value: Language): void {
    this.currentLanguage.set(value);
  }

  public registerOnChange(fn: (value: Language) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {}

  public select(language: Language): void {
    this.currentLanguage.set(language);
    window.location.assign(`/${language}/documentation`);
    this.dropdown.toggle();
  }
}
