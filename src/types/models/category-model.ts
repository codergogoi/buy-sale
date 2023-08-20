export interface CategoryModel {
  _id: string;
  name: string;
  parentId: string;
  subCategories: [string];
  displayOrder: number;
  imageUrl: string;
}
