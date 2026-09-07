export type ProductCategory = 
  | 'engagement-rings' 
  | 'wedding-bands' 
  | 'fine-jewelry' 
  | 'bespoke-creations';

export type MetalType = 
  | '18k Yellow Gold' 
  | 'Platinum' 
  | '18k White Gold' 
  | '18k Rose Gold';

export type DiamondShape = 
  | 'Oval' 
  | 'Round Brilliant' 
  | 'Emerald' 
  | 'Cushion' 
  | 'Radiant' 
  | 'Pear' 
  | 'Marquise' 
  | 'Princess';

export type DiamondOrigin = 'Lab Grown' | 'Natural';

export interface Product {
  id: string;
  handle: string; // Shopify URL slug (e.g. bespoke-oval-solitaire)
  title: string;
  tagline: string;
  description: string;
  category: ProductCategory;
  price: number; // Base price in GBP £
  compareAtPrice?: number;
  metals: MetalType[];
  defaultMetal: MetalType;
  diamondShape: DiamondShape;
  caratOptions: number[]; // e.g. [1.0, 1.5, 2.0, 2.5, 3.0]
  defaultCarat: number;
  diamondType: DiamondOrigin;
  clarity: string; // e.g. 'VVS1', 'VS1'
  colorGrade: string; // e.g. 'D', 'E', 'F'
  images: string[];
  sku: string;
  inventoryQuantity: number;
  tags: string[];
  isBestseller?: boolean;
  isNew?: boolean;
  certification: string; // e.g. 'GIA Certified', 'IGI Certified'
  vendor: string; // 'Ever After Diamonds'
  productType: string;
}

export interface CartItem {
  cartId: string;
  product: Product;
  selectedMetal: MetalType;
  selectedCarat: number;
  selectedDiamondType: DiamondOrigin;
  ringSize: string;
  engravingText?: string;
  unitPrice: number;
  quantity: number;
}

export interface FilterState {
  category: string;
  metal: string;
  shape: string;
  diamondType: string;
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'carat-desc';
}

export interface ConsultationRequest {
  fullName: string;
  email: string;
  phone: string;
  preferredDate?: string;
  serviceType: 'Bespoke Engagement Ring' | 'Wedding Band Consultation' | 'Fine Jewelry Styling' | 'Diamond Upgrade';
  diamondPreference: string;
  budgetRange: string;
  notes?: string;
}

export interface CustomerProfile {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  anniversaryDate?: string;
  preferredRingSize?: string;
  vipTier: string;
}

export interface CustomerAddress {
  id: string;
  label: string; // e.g. 'Home - Kensington', 'Mayfair Office'
  recipientName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postcode: string;
  country: string;
  isDefault: boolean;
}

export interface CustomerPaymentCard {
  id: string;
  cardholderName: string;
  cardNumberMasked: string; // e.g. '•••• •••• •••• 4242'
  expiryDate: string; // e.g. '08/29'
  brand: 'Visa' | 'Mastercard' | 'Amex';
  isDefault: boolean;
}
