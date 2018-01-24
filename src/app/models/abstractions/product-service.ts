import { Product } from "../product";
import { Observable } from "rxjs/Observable";

export abstract class IProductService {
    abstract checkTitleIsUnique(title: string): boolean;
    abstract getAll(): Observable<Product[]>;
    abstract get(id: string): Observable<Product>;
    abstract update(product: Product);
    abstract create(product: Product);
    abstract delete(product: Product);
}