import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  PLATFORM_ID,
} from '@angular/core';
import { SCInputModule } from '@ui-kit/input/input.module';
import { SCDecoratorsModule } from '@ui-kit/decorators/decorators.module';
import { SCIconModule } from '@ui-kit/icon/icon.module';
import { SCCheckboxModule } from '@ui-kit/checkbox/checkbox.module';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected themeControl = new FormControl<boolean>(true);
}
