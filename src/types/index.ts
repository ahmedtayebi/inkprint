// ─── Wilaya ──────────────────────────────────────────────────────────────────
export interface Wilaya {
  code: string;
  name: string;
  nameAr: string;
}

// ─── Order Form ───────────────────────────────────────────────────────────────
export type PrintTechnique = 'DTF' | 'Sérigraphie' | 'Broderie' | 'Sublimation';
export type TShirtColor = 'blanc' | 'noir' | 'gris' | 'bleu marine' | 'rouge' | 'autre';
export type TShirtSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL';

export interface OrderFormData {
  fullName: string;
  phone: string;
  wilaya: string;
  commune: string;
  quantity: number;
  sizes: TShirtSize[];
  color: TShirtColor;
  technique: PrintTechnique;
  designDescription: string;
  hasDesignFile: boolean;
  notes?: string;
}

// ─── Navigation ───────────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
}

// ─── How It Works ─────────────────────────────────────────────────────────────
export interface Step {
  number: string;
  title: string;
  description: string;
  icon: string;
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  technique: string;
  seed: string;
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────
export interface Feature {
  icon: string;
  title: string;
  description: string;
}
