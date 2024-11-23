import { BaseContent } from './baseContent';

export interface Article extends BaseContent {
  title: string;
  content: string;
  author: string;
}