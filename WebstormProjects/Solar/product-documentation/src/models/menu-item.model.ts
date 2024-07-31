export interface MenuItemModel {
  id: string;
  name: string;
  items?: MenuItemModel[];
  link?: string;
}
