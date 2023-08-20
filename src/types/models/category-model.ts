export interface CategoryModel {
  _id: string;
  id: number;
  name: string;
  parentId: string;
  subCategories: [string];
  displayOrder: number;
  imageUrl: string;
}
