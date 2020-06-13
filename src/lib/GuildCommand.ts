import {Command} from "./Command";
import {Bot} from "../Bot";
import {GuildHandler} from "./GuildHandler";

/**
 * An extended version for of the abstract command class that also requires the guild handler.
 */
export abstract class GuildCommand extends Command {
    protected guildHandler: GuildHandler;

    /**
     * constructor
     * @param bot
     * @param guildHandler
     */
    protected constructor(bot: Bot, guildHandler: GuildHandler) {
        super(bot);
        this.guildHandler = guildHandler;
    }
}
