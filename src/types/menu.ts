export interface Addon {
  id: string;
  name: string;
  price: number;
}

export interface NutritionalInfo {
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
  selectedAddons: Addon[];
  specialInstructions: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  category: string;
  servesCount: string;
  cookingInstructions: string[];
  recipe: string[];
  nutritionalInfo: NutritionalInfo;
  addons: Addon[];
  isVegetarian: boolean;
  isSpicy: boolean;
  tasteIndicators: string[];
  preparationTime: string;
  region?: string; // e.g., "North Indian", "South Indian"
} 