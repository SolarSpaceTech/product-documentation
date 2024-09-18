import process from "process";
import { join, sep } from "node:path";
import { readFileSync } from "node:fs";
import frontMatter from "front-matter";
import { ContentAttributesModel } from '../../../../models';

export const getBreadcrumbsEndpoint = async (req: any, res: any) => {
  try {
    const [language, ...partPaths] = req.params[0].split(sep);

    const items = [];
    const currentPaths = [process.cwd(), 'content', language];

    const maxIndex = partPaths.length - 1;
    for (let index = 0; index <= maxIndex; index++) {
      currentPaths.push(partPaths[index]);
      const filePath = index === maxIndex ? `${join(...currentPaths)}.md` : `${join(...currentPaths, 'metadata')}.md`
      const attributes = getAttributes(filePath);
      if (attributes?.displayName) {
        items.push(attributes.displayName);
      }
    }
    res.json({ items });
  } catch {
    res.json({ items: [] });
  }
}

function getAttributes(path: string): any {
  const content = readFileSync(path, 'utf8');
  if (!content) {
    return null;
  }
  const raw = frontMatter<ContentAttributesModel>(content);
  return  raw.attributes;
}
