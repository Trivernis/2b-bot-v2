import {Command} from "./Command";

export class CommandCollection<T> extends Set<T> {
    /**
     * Includes all values of one set in this one.
     * @param set
     */
    public include(set: Set<any>) {
        for (const entry of set) {
            if (!this.has(entry)) {
                this.add(entry);
            }
        }
    }

    /**
     * Finds a command inside a set.
     * @param callbackFn
     */
    public find(callbackFn: (entry: any) => boolean) {
        for (const entry of this) {
            if (callbackFn(entry)) {
                return entry;
            }
        }
    }

    /**
     * Returns a command by name.
     * @param name
     */
    public findByName(name: string) {
        return this.find((command) => command.commandName === name);
    }
}
