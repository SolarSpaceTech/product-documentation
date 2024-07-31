import { MenuItemModel } from "../../../../models";
import { MenuMapRecordModel } from "../../../../app/core/modules/menu/models";
import { join } from "node:path";
import { FileContentModel } from "./file-content.model";

export class FileMenuList {
  constructor(
    private readonly parentDirPath: string,
    private readonly subDirPath: string,
    private readonly fileContentMap: Map<string, FileContentModel>,
  ) {}

  public prepare(contentPaths: string[]): MenuItemModel[] {
    const paths: string[] = contentPaths.map(
      (contentPath: string) => contentPath
        .replace(`${this.parentDirPath}/`, '')
        .split('.')[0]
    );
    const menuMap: MenuMapRecordModel = this.getMenuMap(paths);
    const menu: MenuItemModel = {
      id: '',
      name: '',
      items: this.getMenuItems(menuMap),
    };
    return this.findSubDir(menu);
  }

  private findSubDir(menu: MenuItemModel): MenuItemModel[] {
    const pathParts: string[] = this.subDirPath.split('/');

    let currentId = '';
    let result = menu;
    pathParts.forEach((pathPart: string) => {
      if (currentId) {
        currentId += `/${pathPart}`;
      } else {
        currentId = pathPart;
      }
      const currentMenuItem = result.items!.find((item) => item.id === currentId);
      if (currentMenuItem) {
        result = currentMenuItem
      }
    });
    return [result];
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
      return map;
    }, {});
  }

  private getMenuItems(menuMap: MenuMapRecordModel, path: string = ''): MenuItemModel[] {
    return Object.keys(menuMap)
      .filter((menuMapItem: string) => menuMapItem !== 'metadata')
      .map((menuMapItem: string) => {
        const currentPath: string = join(path, menuMapItem);

        const menuItem: MenuItemModel = {
          id: currentPath,
          name: this.mapItemName(currentPath),
        };

        const items: MenuItemModel[] = this.getMenuItems(menuMap[menuMapItem], currentPath);

        if (items.length > 0) {
          menuItem.items = items;
        } else {
          menuItem.link = currentPath
        }
        return menuItem;
      });
  }

  private mapItemName(currentPath: string): string {
    return this.fileContentMap.get(`${this.parentDirPath}/${currentPath}.md`)?.attributes?.displayName
    ?? this.fileContentMap.get(`${this.parentDirPath}/${currentPath}/metadata.md`)?.attributes?.displayName
    ?? '';
  }
}
