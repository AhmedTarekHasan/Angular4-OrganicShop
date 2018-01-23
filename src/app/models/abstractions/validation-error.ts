/*export interface IValidationError {
    message: string;
    params: string[];
    messageFormatter: (() => string);
}

export class ValidationErrorBase implements IValidationError {
    public message: string;
    public params: string[];

    public messageFormatter(): string {
        return this.htmlEscape ;
    }

    htmlEscape(literals, ...placeholders) {
        let result = "";
    
        for (let i = 0; i < placeholders.length; i++) {
            result += (literals[i] + placeholders[i]);
        }

        result += literals[literals.length - 1];
        return result;
    }
}*/