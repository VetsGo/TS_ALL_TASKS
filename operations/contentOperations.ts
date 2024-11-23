import { BaseContent } from '../models/baseContent';

export type ContentOperations<T extends BaseContent> = {
  create: (item: T) => T;
  read: (id: string) => T | null;
  update: (id: string, data: Partial<T>) => T | null;
  delete: (id: string) => boolean;
};