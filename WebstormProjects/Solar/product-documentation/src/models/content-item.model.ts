export interface ContentItemModel<AttributeInterface = any> {
  attributes: AttributeInterface;
  path: string;
  content?: string;
}
