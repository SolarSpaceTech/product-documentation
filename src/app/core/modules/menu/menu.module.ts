import { NgModule } from "@angular/core";
import { MenuComponent } from "./menu.component";
import { MenuPreparerService, MenuStateService } from "./services";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";

@NgModule({
  imports: [CommonModule, RouterLink, RouterLinkActive],
  declarations: [MenuComponent],
  providers: [MenuPreparerService, MenuStateService],
  exports: [MenuComponent],
})
export class MenuModule {}
