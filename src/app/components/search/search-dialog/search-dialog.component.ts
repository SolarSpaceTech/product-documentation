import { Component, effect, inject } from '@angular/core';
import { DialogRef, DIALOG_DATA, DialogModule } from '@angular/cdk/dialog';
import {
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { SCIconModule } from '@ui-kit/icon/icon.module';
import { SCDecoratorsModule } from '@ui-kit/decorators/decorators.module';
import { SCInputModule } from '@ui-kit/input/input.module';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { SearchResultComponent } from '../search-result/search-result.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-search-dialog',
  templateUrl: 'search-dialog.component.html',
  styleUrl: 'search-dialog.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    SCInputModule,
    SCIconModule,
    SCDecoratorsModule,
    SearchResultComponent,
  ],
})
export class SearchDialogComponent {
  dialogRef = inject<DialogRef<string>>(DialogRef<string>);
  data = inject(DIALOG_DATA);

  public searchControl = new FormControl<string>('');
  public searchControlData = toSignal(this.searchControl.valueChanges);

  public myEffect = effect(() => {
    console.log(this.searchControlData());
  });

  public resetSearch(): void {
    this.searchControl.patchValue('');
  }
}
