export interface ProductCategory {
  id: string;
  title: string;
  total?: number;
  image?: string;
}

export interface CreateProductCategory {
  title: string;
  image?: string;
}
