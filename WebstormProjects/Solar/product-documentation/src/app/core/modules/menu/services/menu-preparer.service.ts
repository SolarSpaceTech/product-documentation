import { Injectable } from "@angular/core";
import { MenuMapRecordModel } from "../models";
import { MenuItemModel } from "../../../../../models";

@Injectable()
export class MenuPreparerService {
  private readonly SELF_CONTENT = Symbol('SELF_CONTENT');

  public prepare(paths: string[]): MenuItemModel[] {
    const menuMap: MenuMapRecordModel = this.getMenuMap(paths);
    return this.getMenuItems(menuMap);
  }

  private getMenuMap(paths: string[]): MenuMapRecordModel {
    return paths.reduce((map: any, path: string) => {
      const pathPartArray: string[] = path.split('/');
      let lastMenuItem = map;
      pathPartArray.forEach((pathPart: string) => {
        if (!lastMenuItem[pathPart]) {
          lastMenuItem[pathPart] = {};
        }
        lastMenuItem = lastMenuItem[pathPart];
      });
      lastMenuItem[this.SELF_CONTENT] = true;
      return map;
    }, {});
  }

  private getMenuItems(menuMap: MenuMapRecordModel, path: string = ''): MenuItemModel[] {
    return Object.keys(menuMap).map((menuMapItem: string) => {
      const currentPath = `${path}/${menuMapItem}`;

      const items: MenuItemModel[] = this.getMenuItems(menuMap[menuMapItem], currentPath);
      const isList = items.length > 0;
      const hasContent = menuMap[menuMapItem][this.SELF_CONTENT];

      if (isList && hasContent) {
        items.push({
          id: currentPath,
          name: menuMapItem,
          items: [],
          link: currentPath,
        });
      }

      return {
        id: currentPath,
        name: menuMapItem,
        items: items,
        link: !isList && hasContent ? currentPath : null,
      };
    });
  }
}
