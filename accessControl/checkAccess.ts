import { AccessControl } from './accessControl';
import { BaseContent } from '../models/baseContent';
import { Permission } from '../types/permission';
import { Role } from '../types/role';

export const checkAccess = <T extends BaseContent>(accessControl: AccessControl<T>, role: Role, action: keyof Permission): boolean => {
  return accessControl[role][action];
};