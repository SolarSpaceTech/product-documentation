import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  Input,
  Signal,
} from '@angular/core';
import { MenuItemModel } from '../../../../models';
import { Observable } from 'rxjs';
import { MenuStateService } from './services';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  public displayingSubmenuSet: Signal<Set<string>> =
    this.menuStateService.displayingSubmenuSet;

  public displayingSubmenuSetDEBUG: any = computed(() => ({
    ...this.menuStateService.displayingSubmenuSet(),
  }));

  public menu = input<MenuItemModel[]>([]);
  public level = input(0);
  public nextLevel = computed(() => this.level() + 1);

  constructor(private readonly menuStateService: MenuStateService) {}

  public toggleBlockDisplay(id: string): void {
    this.menuStateService.toggleMenuBlockItem(id);
  }

  public submenuTrackBy(_, submenu: MenuItemModel) {
    return submenu.id;
  }
}
