import process from 'process';
import { join } from 'node:path';
import { readFile } from 'node:fs';
import frontMatter from 'front-matter';
import { glob } from 'fast-glob';

const getRawContent = async () => {
  const rootDir = process.cwd();
  const parentDirPath = join(rootDir, 'content');
  const contentPaths = await glob(join(parentDirPath, '**', '*.md'), {
    absolute: false,
    baseNameMatch: true,
    onlyFiles: true,
  });

  const contentItems = await Promise.all(
    contentPaths.map(
      (contentPath: string) =>
        new Promise((resolve, reject) => {
          readFile(contentPath, 'utf8', (error, content: string) => {
            const raw = frontMatter(content);
            resolve({
              attributes: raw.attributes,
              content: raw.body,
              path: contentPath,
            });
          });
        }),
    ),
  );

  return contentItems;
};

const generateIndexes = async (rawContent: any) => {
  const indexData = rawContent.map((item: any) => ({
    breadcrumbs: item.path.split('/'),
    pageType: 'guide',
    title: item.attributes.title,
    section: item.path.split('/').at(-2),
    route: item.url,
    fragment: item.attributes.title.toLowerCase(),
    content: item.content,
  }));

  return indexData;
};

const splitContentByLineBreaks = (arr: any) => {
  const result: any = [];

  arr.forEach((obj: any) => {
    if (obj.content) {
      const contentLines = obj.content
        .split('\n')
        .filter((line: any) => line.trim() !== '');

      contentLines.forEach((line: any) => {
        const newObj = {
          ...obj,
          content: line + '\n',
        };
        result.push(newObj as never);
      });
    } else {
      result.push(obj as never);
    }
  });

  return result as any;
};

export const getSearchIndexesEndpoint = async (req: any, res: any) => {
  try {
    const rawContent = await getRawContent();
    const splittedContent = splitContentByLineBreaks(rawContent);
    const result = generateIndexes(splittedContent);
    res.json(result);
  } catch {
    res.json({ message: 'No content' });
  }
};
