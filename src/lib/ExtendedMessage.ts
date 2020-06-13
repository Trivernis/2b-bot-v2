import {Message} from "discord.js";

const messageRegex: RegExp = /^(.)(\w+)\s*(.*)$/;

/**
 * A class for parsing messages in an easier to handle format.
 */
export class ExtendedMessage {

    public readonly originalMessage: Message;
    public readonly content: string;
    public readonly prefix: string;
    public readonly commandName: string;
    public readonly argString: string;
    public readonly args: string[];

    constructor(message: Message) {
        this.originalMessage = message;
        this.content = message.content;
        const matches = this.content.match(messageRegex);
        this.prefix = matches[1];
        this.commandName = matches[2];
        this.argString = matches[3];
        this.args = matches[3].split(/\s+/).filter((s) => s.length > 0);
    }
}
