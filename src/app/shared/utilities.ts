import { isWebUri } from 'valid-url';
import { ValidatorFn, AbstractControl, ValidationErrors, Validators, AsyncValidatorFn } from '@angular/forms';
import { IProductService } from '../models/abstractions/product-service';
import { Observable } from 'rxjs/Observable';

export function IsValidURL(str: string): boolean {
  return isWebUri(str);
}

export class CustomValidators {
  constructor () {
  }
  
  public static required(fieldName: string): ValidatorFn {
      let validationFn: ValidatorFn = (c: AbstractControl): ValidationErrors | null => {
          let result = null;

          if(Validators.required(c)) {
              result = {
                  'required': {
                      message: fieldName + ' is required'
                  }
              };
          }

          return result;
      };

      return validationFn;
  }

  public static url(fieldName: string): ValidatorFn {
      let validationFn: ValidatorFn = (c: AbstractControl): ValidationErrors | null => {
          let result = null;

          if(!IsValidURL(c.value)) {
              result = {
                  'url': {
                      message: fieldName + ' should be in URL format'
                  }
              };
          }

          return result;
      };

      return validationFn;
  }

  public static minValueInclusive(fieldName: string, minValue: number): ValidatorFn {
    let validationFn: ValidatorFn = (c: AbstractControl): ValidationErrors | null => {
        let result = null;

        if(parseFloat(c.value) < parseFloat(minValue.toString())) {
            result = {
                'minValue': {
                    message: fieldName + ' should be greater than or equal to ' + minValue.toString()
                }
            };
        }

        return result;
    };

    return validationFn;
  }

  public static minValueExclusive(fieldName: string, minValue: number): ValidatorFn {
    let validationFn: ValidatorFn = (c: AbstractControl): ValidationErrors | null => {
        let result = null;

        if(parseFloat(c.value) <= parseFloat(minValue.toString())) {
            result = {
                'minValue': {
                    message: fieldName + ' should be greater than ' + minValue.toString()
                }
            };
        }

        return result;
    };

    return validationFn;
  }

  public static maxValueExclusive(fieldName: string, maxValue: number): ValidatorFn {
    let validationFn: ValidatorFn = (c: AbstractControl): ValidationErrors | null => {
        let result = null;

        if(parseFloat(c.value) && parseFloat(maxValue.toString()) && parseFloat(c.value) >= parseFloat(maxValue.toString())) {
            result = {
                'maxValue': {
                    message: fieldName + ' should be less than ' + maxValue.toString()
                }
            };
        }

        return result;
    };

    return validationFn;
  }
}