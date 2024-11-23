import { Validator, ValidationResult } from '../types/validationResult';

export class CompositeValidator<T> {
  private validators: Validator<T>[] = [];

  addValidator(validator: Validator<T>): void {
    this.validators.push(validator);
  }

  validate(data: T): ValidationResult {
    const errors: string[] = [];
    let isValid = true;

    for (const validator of this.validators) {
      const result = validator.validate(data);
      if (!result.isValid) {
        isValid = false;
        if (result.errors) {
          errors.push(...result.errors);
        }
      }
    }

    return { isValid, errors };
  }
}