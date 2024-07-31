import process from "process";
import { join } from "node:path";
import { readFileSync } from "node:fs";
import frontMatter from "front-matter";

export const getContentEndpoint = async (req: any, res: any) => {
  try {
    const rootDir = process.cwd();
    const contentDir = join(rootDir, 'content');
    const contentPath = `${join(contentDir, req.params[0])}.md`;
    const content = readFileSync(contentPath, 'utf8');
    if (!content) {
      res.json({ message: 'No content' });
    }
    const raw = frontMatter(content);
    res.json({
      attributes: raw.attributes,
      content: raw.body,
      path: contentPath.replace(`${contentDir}/`, '').split('.')[0],
    });
  } catch {
    res.json({ message: 'No content' });
  }

}
