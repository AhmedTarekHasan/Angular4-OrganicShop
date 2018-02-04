import { IShoppingCart, ShoppingCartReport, ProductPurchaseRecord } from "./abstractions/shopping-cart";
import { Product } from "./product";

export class ShoppingCart extends IShoppingCart {
    private dicitonaryObject = {};
    private products: Product[] = [];

    public get report(): ShoppingCartReport {
        let report: ShoppingCartReport = new ShoppingCartReport();

        for (var key in this.dicitonaryObject) {
            if (this.dicitonaryObject.hasOwnProperty(key) && this.dicitonaryObject[key] && this.dicitonaryObject[key] !== null) {
                let record = new ProductPurchaseRecord();
                record.product = this.products.find(val => val.id === key);
                record.productItemsCount = this.dicitonaryObject[key];
                report.records.push(record);
            }
        }

        return report;
    }
    public get totalCount(): number {
        let count = 0;
    
        for (var key in this.dicitonaryObject) {
            if (this.dicitonaryObject.hasOwnProperty(key) && this.dicitonaryObject[key] && this.dicitonaryObject[key] !== null) {
                count += this.dicitonaryObject[key];
            }
        }

        return count;
    }
    public get totalPrice(): number {
        let price = 0;
    
        for (var key in this.dicitonaryObject) {
            if (this.dicitonaryObject.hasOwnProperty(key) && this.dicitonaryObject[key] && this.dicitonaryObject[key] !== null) {
                price += (this.dicitonaryObject[key] * this.products.find(val => val.id === key).price);
            }
        }

        return price;
    }
    public getProductItemsCount(product: Product): number {
        let count = 0;

        if(this.dicitonaryObject[product.id] && this.dicitonaryObject[product.id] !== null) {
            count = this.dicitonaryObject[product.id];
        }

        return count;
    }
    public addProductItem(product: Product): void {
        if(!this.dicitonaryObject[product.id] || this.dicitonaryObject[product.id] === null) {
            this.dicitonaryObject[product.id] = 0;
        }

        if(this.products.findIndex(val => val.id === product.id) < 0) {
            this.products.push(product);
        }

        this.dicitonaryObject[product.id] = this.dicitonaryObject[product.id] + 1;
    }
    public removeProductItem(product: Product): void {
        if(!this.dicitonaryObject[product.id] || this.dicitonaryObject[product.id] === null) {
            this.dicitonaryObject[product.id] = 0;
        }

        this.dicitonaryObject[product.id] = this.dicitonaryObject[product.id] - 1;

        if(this.dicitonaryObject[product.id] <= 0) {
            delete this.dicitonaryObject[product.id];
            this.products = this.products.filter(val => val.id !== product.id);
        }
    }
    public clear(): void {
        for (var key in this.dicitonaryObject) {
            if (this.dicitonaryObject.hasOwnProperty(key) && this.dicitonaryObject[key]) {
                delete this.dicitonaryObject[key];
            }
        }

        this.products = [];
        this.dicitonaryObject = {};
    }
}