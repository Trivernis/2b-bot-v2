export abstract class BotError extends Error {

    /**
     * the name of the error
     */
    name: string;

    /**
     * The
     */
    description: string;

    /**
     * Override the default toString for a better error description.
     */
    toString() {
        return `${this.name}: ${this.description}`;
    }
}
