import { ValidatorFn, AbstractControl, ValidationErrors, AsyncValidatorFn, Validators } from "@angular/forms";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { IProductService } from "../../models/abstractions/product-service";

export class ProductFormValidators {
    constructor (private productService: IProductService) {
    }
    
    public required(fieldName: string): ValidatorFn {
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

    public titleIsUnique(): AsyncValidatorFn {
        let validationFn: AsyncValidatorFn = (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
            let result = null;

            if(!this.productService.checkTitleIsUnique(c.value)) {
                result = {
                    'titleIsUnique': {
                        message: 'Title "' + c.value + '" already exists'
                    }
                }
            }

            return Observable.of(result);
        };

        return validationFn;
    }
}