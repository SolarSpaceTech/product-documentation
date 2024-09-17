import process from "process";
import { join } from "node:path";
import { readFileSync, writeFileSync } from "node:fs";
import { glob } from "fast-glob";
import frontMatter from 'front-matter';

export async function initPrerenderRoutes(): Promise<void> {
  const rootDir = process.cwd();
  const contentDir = join(rootDir, 'content');
  const contentPaths = await glob(join(contentDir, '**', '*.md'), {
    absolute: false,
    baseNameMatch: true,
    onlyFiles: true,
    ignore: [join('**', 'metadata.md')],
  });

  const publicContentPaths = getPublicFilePaths(contentPaths);

  const routes = publicContentPaths
    .map((contentPath: string) => contentPath.replace(contentDir, '').split('.')[0]);


  const routesString: string = routes.join('\n');
  writeFileSync("routes.txt", routesString, 'utf8');
}

function getPublicFilePaths(filePaths: Array<string>): Array<string> {
  return filePaths.filter((contentPath: string) => {
    const content = readFileSync(contentPath, 'utf8');
    const raw = frontMatter<{ published: boolean }>(content);
    return raw.attributes.published;
  });
}

initPrerenderRoutes();
