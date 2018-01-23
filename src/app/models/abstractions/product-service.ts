import { Product } from "../product";

export interface IProductService {
    create(product: Product);
    checkTitleIsUnique(title: string): boolean;
}