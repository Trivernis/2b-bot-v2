import {EventEmitter} from "events";
import {type} from "os";

export class ProxyEventEmitter extends EventEmitter implements ProxyHandler<any> {

    /**
     * Adds the object to the handler and returns the proxified version.
     * @param obj
     */
    public proxify(obj: any) {
        for (const prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if (typeof obj[prop] === "object") {
                    const subProxy = new ProxyEventEmitter();
                    this.attachSubProxy(subProxy);
                    obj[prop] = subProxy.proxify(obj[prop]);
                }
            }
        }
        return new Proxy(obj, this);
    }

    /**
     * Proxy get method.
     * Emits a 'get' event.
     * @param obj
     * @param prop
     */
    public get(obj: any, prop: (string|number)): any {
        this.emit("get");
        return obj[prop];
    }

    /**
     * Proxy set method.
     * Emits a 'set' event.
     * @param obj
     * @param prop
     * @param value
     */
    public set(obj: any, prop: (string|number), value: any): boolean {
        this.emit("set");
        if (typeof value === "object") {
            const subProxy = new ProxyEventEmitter();
            this.attachSubProxy(subProxy);
            return obj[prop] = new Proxy(value, subProxy);
        } else {
            return obj[prop] = value;
        }
    }

    /**
     * Proxy defineProperty method.
     * Emits a 'change' event.
     * @param obj
     * @param prop
     * @param descriptor
     */
    public defineProperty(obj: any, prop: (string|number), descriptor: any) {
        this.emit("change");
        return Reflect.defineProperty(obj, prop, descriptor);
    }

    /**
     * Proxy deleteProperty method.
     * Emits a 'change' event.
     * @param obj
     * @param prop
     */
    public deleteProperty(obj: any, prop: (string|number)) {
        this.emit("change");
        return Reflect.deleteProperty(obj, prop);
    }

    /**
     * Attaches the sub proxy events to this proxy.
     * @param subProxy
     */
    private attachSubProxy(subProxy: ProxyEventEmitter) {
        subProxy.on("change", () => this.emit("change"));
        subProxy.on("set", () => this.emit("set"));
        subProxy.on("get", () => this.emit("get"));
    }
}
