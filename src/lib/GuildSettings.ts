export class GuildSettings {

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
