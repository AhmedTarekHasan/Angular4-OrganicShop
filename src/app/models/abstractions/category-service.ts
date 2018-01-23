import { Observable } from "rxjs/Observable";
import { Category } from "../category";

export abstract class ICategoryService {
    abstract getCategories(): Observable<Category[]>;
}