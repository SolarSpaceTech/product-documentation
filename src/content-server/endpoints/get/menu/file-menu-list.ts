import { ContentAttributesModel, ContentItemModel, MenuItemModel } from "../../../../models";
import { MenuMapRecordModel } from "../../../../app/core/modules/menu/models";
import { join } from "node:path";

export class FileMenuList {
  constructor(
    private readonly parentDirPath: string,
    private readonly subDirPath: string,
    private readonly fileContentMap: Map<string, ContentItemModel>,
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
      const currentMenuItem = result.items?.find((item) => item.id === currentId);
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
    return (Object.keys(menuMap) ?? [])
      .reduce((result: MenuItemModel[], menuMapItem) => {
        if (menuMapItem === 'metadata') {
          return result;
        }

        const currentPath: string = join(path, menuMapItem);
        const fileAttributes = this.getAttributes(currentPath);
        if (!fileAttributes?.published) {
          return result;
        }

        const menuItem: MenuItemModel = {
          id: currentPath,
          name: fileAttributes?.displayName ?? '',
        };

        const items: MenuItemModel[] = this.getMenuItems(menuMap[menuMapItem], currentPath);
        if (items.length > 0) {
          menuItem.items = items;
        } else {
          menuItem.link = currentPath
        }
        if (menuItem) {
          result.push(menuItem);
        }
        return result;
      }, [])
      .sort((left, right) => {
        const leftOrder = this.getAttributes(left.id)?.order ?? 10000;
        const rightOrder = this.getAttributes(right.id)?.order ?? 10000;
        return leftOrder - rightOrder;
      });
  }

  private getAttributes(currentPath: string): ContentAttributesModel {
    return this.fileContentMap.get(`${this.parentDirPath}/${currentPath}.md`)?.attributes
      ?? this.fileContentMap.get(`${this.parentDirPath}/${currentPath}/metadata.md`)?.attributes
      ?? {};
  }
}
