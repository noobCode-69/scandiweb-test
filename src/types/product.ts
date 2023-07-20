export enum ProductType {
  DVD = "DVD",
  BOOK = "Book",
  FURNITURE = "Furniture",
}

export type Attribute = {
  label: string;
  value: string;
  unit: string;
};

export type Product = {
  sku: string;
  name: string;
  price: number;
  type: ProductType;
  attributes: Attribute[];
  isSet: boolean;
};
