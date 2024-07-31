import { FileMenuList } from "./file-menu-list";
import { FileContentModel } from "./file-content.model";
import { MenuItemModel } from "../../../../models";
import process from 'process';
import { join } from 'node:path';
import { glob } from 'fast-glob';
import { readFile } from 'node:fs';
import frontMatter from 'front-matter';

export const getMenuEndpoint = async (req: any, res: any) => {
  const rootDir = process.cwd();
  const parentDirPath = join(rootDir, 'content');
  const contentPaths = await glob(join(parentDirPath, '**', '*.md'), {
    absolute: false,
    baseNameMatch: true,
    onlyFiles: true,
  });

  const contentItems = await Promise.all(
    contentPaths.map((contentPath: string) => new Promise((resolve, reject) => {
      readFile(contentPath, 'utf8', (error, content: string) => {
        const raw = frontMatter(content);
        resolve({
          attributes: raw.attributes,
          content: raw.body,
          path: contentPath,
        });
      })
    }))
  );

  const fileContentMap = (contentItems as [] ?? []).reduce((contentItemMap: Map<string, FileContentModel>, { path, attributes, content }) => {
    return contentItemMap.set(path, {
      attributes: attributes,
      content: content
    });
  }, new Map());

  const fileMenuList = new FileMenuList(parentDirPath, req.params[0], fileContentMap);
  let menu: MenuItemModel[] = fileMenuList.prepare(contentPaths);
  res.json(menu);
}
