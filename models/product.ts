import { BaseContent } from './baseContent';

export interface Product extends BaseContent {
  name: string;
  price: number;
  description: string;
  stock: number;
}