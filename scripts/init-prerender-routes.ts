import process from "process";
import { join } from "node:path";
import { openSync, writeFileSync } from "node:fs";
import { glob } from "fast-glob";

export async function initPrerenderRoutes(): Promise<void> {
  const rootDir = process.cwd();
  const contentDir = join(rootDir, 'content');
  const contentPaths = await glob(join(contentDir, '**', '*.md'), {
    absolute: false,
    baseNameMatch: true,
    onlyFiles: true,
    ignore: [join('**', 'metadata.md')],
  });
  const routes = contentPaths
    .map((contentPath: string) => contentPath.replace(contentDir, '').split('.')[0]);

  const routesString: string = routes.join('\n');
  writeFileSync("routes.txt", routesString, 'utf8');
}

initPrerenderRoutes();
