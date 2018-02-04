import { Guid } from "./utilities";

export interface ILiteEvent<T> {
    on(handler: { (data?: T): void }) : LiteEventHandler<T>;
    off(handler: LiteEventHandler<T>) : void;
}

export class LiteEvent<T> implements ILiteEvent<T> {
    private handlers: LiteEventHandler<T>[] = [];

    public on(handler: { (data?: T): void }) : LiteEventHandler<T> {
        let _handler = new LiteEventHandler<T>(Guid.newGuid(), this, handler);
        this.handlers.push(_handler);
        return _handler
    }
    public _on(handler: LiteEventHandler<T>) : void {
        if(this.handlers.findIndex(h => h.id === handler.id) < 0) {
            this.handlers.push(handler);
        }
    }
    public off(handler: LiteEventHandler<T>) : void {
        this.handlers = this.handlers.filter(h => h !== handler);
    }
    public trigger(data?: T) {
        this.handlers.slice(0).forEach(h => {
            if(h.delegate && h.delegate !== null) {
                h.delegate(data);
            }
        });
    }
    public expose() : ILiteEvent<T> {
        return this;
    }
}

export class LiteEventHandler<T> {
    public off(): void {
        this._event.off(this);
    }
    public on(): void {
        this._event._on(this);
    }
    public get id(): string {
        return this._id;
    }
    public get delegate(): (data?: T) => void {
        return this._delegate;
    }
    public set delegate(value: (data?: T) => void) {
        this._delegate = value;
    }

    constructor(private _id: string, private _event: LiteEvent<T>, private _delegate: (data?: T) => void) {
    }
}