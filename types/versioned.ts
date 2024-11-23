import { BaseContent } from '../models/baseContent';

export type Versioned<T extends BaseContent> = T & {
  version: number;
  previousVersions?: T[];
};