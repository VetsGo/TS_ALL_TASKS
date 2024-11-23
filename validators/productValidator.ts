import { Product } from '../models/product';
import { Validator } from '../types/validationResult';

export const productValidator: Validator<Product> = {
  validate: (data) => {
    const errors: string[] = [];
    if (!data.name) errors.push('Name is required.');
    if (data.price <= 0) errors.push('Price must be greater than 0.');
    if (data.stock < 0) errors.push('Stock cannot be negative.');
    return { isValid: errors.length === 0, errors };
  },
};