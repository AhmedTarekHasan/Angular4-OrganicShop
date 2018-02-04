import { Product } from "../product";

export abstract class IShoppingCart {
    public abstract get report(): ShoppingCartReport;
    public abstract get totalCount(): number;
    public abstract get totalPrice(): number;
    public abstract getProductItemsCount(product: Product): number;
    public abstract addProductItem(product: Product): void;
    public abstract removeProductItem(product: Product): void;
    public abstract clear(): void;
}

export class ProductPurchaseRecord {
    public product: Product;
    public productItemsCount: number;
    public get totalPrice(): number {
        return this.product.price * this.productItemsCount;
    }
}

export class ShoppingCartReport {
    public records: ProductPurchaseRecord[] = [];
    public get totalPrice(): number {
        let total = 0;
        this.records.forEach(val => total += val.totalPrice );
        return total;
    }
}