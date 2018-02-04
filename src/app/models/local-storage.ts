import { IStorage } from "./abstractions/storage";

export class LocalStorage extends IStorage {
    public get length(): number {
        return localStorage.length;
    }
    public clear(): void {
        localStorage.clear();
    }
    public getItem(key: string): string | null {
        return localStorage.getItem(key);
    }
    public key(index: number): string | null {
        return localStorage.key(index);
    }
    public removeItem(key: string): void {
        localStorage.removeItem(key);
    }
    public setItem(key: string, data: string): void {
        localStorage.setItem(key, data);
    }
}