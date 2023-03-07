interface Image {
  mobile: string;
  tablet: string;
  desktop: string;
}

interface IncludedItem {
  quantity: number;
  item: string;
}

export interface GalleryImages {
  first: Image;
  second: Image;
  third: Image;
}

export interface OtherProduct {
  slug: string;
  name: string;
  image: Image;
}

export type CartItemProps = {
  id: number;
  image?: {
    mobile?: string;
    desktop?: string;
    tablet?: string;
  };
  name: string;
  price: number;
  quantity?: number;
};

export interface ProductType {
  id: number;
  slug: string;
  name: string;
  image: Image;
  category: string;
  quantity?: number;
  categoryImage: Image;
  new: boolean;
  price: number;
  description: string;
  features: string;
  includes: IncludedItem[];
  gallery: GalleryImages;
  others: OtherProduct[];
}
