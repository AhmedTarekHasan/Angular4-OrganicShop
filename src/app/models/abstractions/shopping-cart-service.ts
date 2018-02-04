import { IShoppingCart } from "./shopping-cart";
import { ILiteEvent } from "../../shared/lite-event";
import { Product } from "../product";

export abstract class IShoppingCartService extends IShoppingCart {
    public abstract clear(): void;
    public abstract get itemAdded(): ILiteEvent<Product>;
    public abstract get itemRemoved(): ILiteEvent<Product>;
    public abstract get itemsCleared(): ILiteEvent<void>;
    public abstract get itemsCountUpdated(): ILiteEvent<number>;
}