import {Config} from "./utils/Config";

export class GuildSettings {

    /**
     * Constructor with config that assigns some config specific stuff.
     * @param config
     */
    constructor(config: Config) {
        this.prefix = config.prefix;
    }

    /**
     * The prefix of the bot.
     */
    public prefix: string = "~";

    /**
     * The role names that are associated with admin privileges.
     */
    public adminRoles: string[] = ["admin"];

    /**
     * The role names that are associated with dj privileges.
     */
    public djRoles: string[] = ["dj"];
}
