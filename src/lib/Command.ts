import {Message, MessageReaction} from "discord.js";
import {CommandPermission} from "./CommandPermission";
import {Bot} from "../Bot";

export abstract class Command {

    protected bot: Bot;

    /**
     * The name of the command
     */
    public static commandName: string;

    /**
     * The description of the command
     */
    public static description: string;

    /**
     * The time to live in seconds before the instance is deleted.
     */
    public readonly ttl: number = 30;

    /**
     * The date the command was created at.
     */
    public createdAt: number;

    /**
     * The permission required to run this command
     */
    public static permission: CommandPermission;

    protected constructor(bot: Bot) {
        this.bot = bot;
        this.createdAt = Date.now();
    }

    public invoke?(msg: Message): Promise<void>|void;

    /**
     * A function that is executed when the answer to the command was sent.
     */
    public onSent?(answer: Message): Promise<void>|void;

    /**
     * A function that is executed when a reaction is added to the command answer
     */
    public onReaction?(reaction: MessageReaction): Promise<void>|void;

    /**
     * returns the name of the command to make it accessible.
     */
    public get name() {
        return Command.commandName;
    }

    /**
     * Returns the arguments of the command
     * @param content
     */
    protected static getArgs(content: string): string[] {
        const argString = content.substr(content.indexOf(this.commandName) + this.commandName.length + 1);
        return [argString, ...argString.split(/\s+/g)];
    }
}
