import {LogLevel} from "./BotLogger";

export abstract class Config {
    /**
     * The time a presence is shown before rotating to the nex one.
     */
    public presenceDuration: number = 300000;

    /**
     * The maximum number of commands in a sequence.
     */
    public maxCommandSequenceLength: number = 10;

    /**
     * The number of commands that are allowed in a minute by one user.
     */
    public rateLimitMessageCount: number = 30;

    /**
     * The discord bot token.
     */
    public botToken: string;

    /**
     * logging configuration
     */
    public logging: {
        directory: string;
        level: LogLevel;
    };

    /**
     * The connection URI for the database.
     */
    public dbUri: string;

    /**
     * The owners of the bot that have elevated privileges
     */
    public owners: string[];
}
