import {CommandPermission} from "../../../lib/CommandPermission";
import {GuildCommand} from "../../../lib/GuildCommand";
import {Message} from "discord.js";
import {CommandCategory} from "../../CommandCategory";

export class RemoveAdminRoles extends GuildCommand {
    public static commandName = "removeAdminRoles";
    public static description = "Removes one or more roles from the configured roles";
    public static usage = "removeAdminRoles <roleName>...";
    public static permission = CommandPermission.ADMIN;
    public static category = CommandCategory.UTILITY;

    /**
     * Removes all specified roles from the admin roles.
     */
    public invoke(msg: Message): Promise<void> | void {
        const args = RemoveAdminRoles.getArgs(msg.content);
        if (args.length < 2) {
            msg.channel.send("No argument for role names provided.");
        } else {
            const roles = args.splice(1);
            const adminRoles = this.guildHandler.settings.adminRoles;
            this.guildHandler.settings.adminRoles = adminRoles.filter((role) => !roles.includes(role));
            msg.channel.send(`Removed **${roles.join("**, **")}** from the admin roles.`);
        }
    }
}
