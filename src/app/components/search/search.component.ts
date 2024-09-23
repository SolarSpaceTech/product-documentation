import { Component, inject } from '@angular/core';
import { Dialog, DialogModule, DIALOG_DATA } from '@angular/cdk/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { SearchDialogComponent } from './search-dialog/search-dialog.component';
import { SCInputModule } from '@ui-kit/input/input.module';
import { SCDecoratorsModule } from '@ui-kit/decorators/decorators.module';
import { SCIconModule } from '@ui-kit/icon/icon.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  imports: [
    DialogModule,
    OverlayModule,
    CommonModule,
    SCInputModule,
    SCDecoratorsModule,
    SCIconModule,
  ],
})
export class SearchComponent {
  dialog = inject(Dialog);

  animal: string | undefined;
  name: string;

  openDialog(): void {
    const dialogRef = this.dialog.open<string>(SearchDialogComponent);

    dialogRef.closed.subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}
