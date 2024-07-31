import {MarkdownElementType} from "../types";

export interface MarkdownTokenModel {
  type: MarkdownElementType;
  text: string;
  raw: string;
  href?: string;
  tokens?: MarkdownTokenModel[];
  depth?: number;
}
