import { ValidationError } from 'class-validator';

export const formatManualValidationErrors = (
  errors: ValidationError[],
): any => {
  const formattedErrors: any = [];
  console.log(errors);

  errors.forEach((error) => {
    const errorsArrayOfOnrProp = Object.values(error.constraints);
    formattedErrors.push(...errorsArrayOfOnrProp);
  });

  return formattedErrors;
};
