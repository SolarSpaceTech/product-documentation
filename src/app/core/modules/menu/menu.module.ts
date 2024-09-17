import { NgModule } from '@angular/core';
import { MenuComponent } from './menu.component';
import { MenuPreparerService, MenuStateService } from './services';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SCIconModule } from '@ui-kit/icon';

@NgModule({
  imports: [CommonModule, RouterLink, RouterLinkActive, SCIconModule],
  declarations: [MenuComponent],
  providers: [MenuPreparerService, MenuStateService],
  exports: [MenuComponent],
})
export class MenuModule {}
