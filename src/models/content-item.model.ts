import { ContentAttributesModel } from './content-attributes.model';

export interface ContentItemModel<AttributeInterface = ContentAttributesModel> {
  attributes: AttributeInterface;
  path: string;
  content?: string;
}
