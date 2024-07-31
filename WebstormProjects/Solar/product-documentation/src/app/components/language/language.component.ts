import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-language',
  template: `<router-outlet></router-outlet>`,
  styleUrl: './language.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageComponent {}
