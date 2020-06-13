import {Config} from "./Config";

export class DefaultConfig extends Config {
    /**
     * The time a presence is shown before rotating to the nex one.
     */
    public presenceDuration: number = 300000;

    /**
     * The number of commands a user is allowed to execute in one minute.
     */
    public rateLimitMessageCount: number = 30;

    /**
     * The discord bot token.
     */
    public botToken: string = "Your bot token here.";

    /**
     * The logging configuration
     */
    // @ts-ignore
    public logging = {
        directory: "../logs",
        level: "info",
    };

    public dbUri: string = "sqlite://bot.db";

    /**
     * The owners of the bot that have elevated privileges
     */
    public owners: string[] = [];

    /**
     * The prefix of the bot.
     */
    public prefix: string = "~";
}
