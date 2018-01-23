import { Observable } from "rxjs/Observable";
import { Category } from "../category";

export interface ICategoryService {
    getCategories(): Observable<Category[]>;
}