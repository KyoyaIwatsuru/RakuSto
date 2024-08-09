export interface ItemObject {
  ItemId: number;
  ItemName: string;
  ItemImage: string;
  Category: string;
  Unit: number;
  PurchaseDate: Date;
  LimitDate: Date;
  ItemURL: string;
}

export interface CardsProps {
  itemFilter: string;
}

export interface RankItem {
  ItemId: string;
  ItemName: string;
  ItemUrl: string;
  ItemImage: string;
}

export interface Rank {
  itemCode: string;
  itemName: string;
  itemUrl: string;
  mediumImageUrls: string[];
}

export interface FilterProps {
  setItemFilter: (filter: string) => void;
}

export type Recipe = {
  id: number;
  title: string;
  imageUrl: string;
  detailPageUrl: string;
  category: string;
};