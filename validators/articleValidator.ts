import { Article } from '../models/article';
import { Validator } from '../types/validationResult';

export const articleValidator: Validator<Article> = {
  validate: (data) => {
    const errors: string[] = [];
    if (!data.title) errors.push('Title is required.');
    if (!data.content) errors.push('Content is required.');
    if (!data.author) errors.push('Author is required.');
    return { isValid: errors.length === 0, errors };
  },
};