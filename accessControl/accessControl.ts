import { Role } from '../types/role';
import { ContentOperations } from '../operations/contentOperations';
import { BaseContent } from '../models/baseContent';

export type AccessControl<T extends BaseContent> = {
  [role in Role]: {
    [key in keyof ContentOperations<T>]: boolean;
  };
};