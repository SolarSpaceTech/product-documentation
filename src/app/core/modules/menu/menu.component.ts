import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  Input,
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
  public displayingSubmenuSet$: Observable<Set<string>> =
    this.menuStateService.displayingSubmenuSet$;

  public menu = input<MenuItemModel[]>([]);

  public addLevelToMenuItems = (
    menuItems: MenuItemModel[],
    level: number = 0,
  ): MenuItemModel[] =>
    menuItems.map((item) => ({
      ...item,
      level,
      items: item.items
        ? this.addLevelToMenuItems(item.items, level + 1)
        : undefined,
    }));

  public structuredMenu = computed(() => this.addLevelToMenuItems(this.menu()));

  constructor(private readonly menuStateService: MenuStateService) {}

  public toggleBlockDisplay(id: string): void {
    this.menuStateService.toggleMenuBlockItem(id);
  }

  public submenuTrackBy(_, submenu: MenuItemModel) {
    return submenu.id;
  }
}
