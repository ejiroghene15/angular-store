export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  rating?: {
    rate: number;
    count: number;
  },
  tags?: string[],
  sku?: string
  quantity: number,
  thumbnail: string
}

export interface IProducts {
  products: Product[]
}
