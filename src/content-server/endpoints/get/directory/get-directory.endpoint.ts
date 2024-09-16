import process from "process";
import { join } from "node:path";
import { readFileSync } from "node:fs";
import frontMatter from "front-matter";
import { glob } from 'fast-glob';
import { ContentAttributesModel, ContentItemModel } from '../../../../models';

export const getDirectoryEndpoint = async (req: any, res: any) => {
  try {
    const rootDir: string = process.cwd();
    const contentPath: string = join(rootDir, 'content');
    let currentDirPath: string = contentPath;
    if (req.params[0]) {
      currentDirPath = join(contentPath, req.params[0]);
    }

    const dirPaths = await glob(join(currentDirPath, '*'), {
      absolute: false,
      baseNameMatch: true,
      onlyDirectories: true,
    });

    const contentList = dirPaths.reduce((result: ContentItemModel[], dirPath: string) => {
      const content = getContent(dirPath);
      if (content) {
        const raw = frontMatter<ContentAttributesModel>(content);
        result.push({
          attributes: raw.attributes,
          path: dirPath.replace(`${contentPath}/`, '').split('.')[0],
        });
      }
      return result;
    }, []);
    res.json(contentList);
  } catch {
    res.json({ message: 'No content' });
  }

}

function getContent(contentPath: string): string {
  let content: string = readFile(`${contentPath}.md`);
  if (!content) {
    const metadataPath = join(contentPath, 'metadata');
    content = readFile(`${metadataPath}.md`);
  }
  return content;
}

function readFile(contentPath: string): string {
  try {
    return readFileSync(contentPath, 'utf8');
  } catch {
    return '';
  }
}
