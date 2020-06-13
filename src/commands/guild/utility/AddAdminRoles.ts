import {Message} from "discord.js";
import {GuildCommand} from "../../../lib/GuildCommand";
import {CommandPermission} from "../../../lib/CommandPermission";
import {CommandCategory} from "../../CommandCategory";

export class AddAdminRoles extends GuildCommand {
    public static commandName = "addAdminRoles";
    public static description = "Adds roles to the recognized admin roles for command permissions.";
    public static usage = "addAdminRoles <roleName>...";
    public static permission = CommandPermission.ADMIN;
    public static category = CommandCategory.UTILITY;

    /**
     * Adds an admin role to the admin role setting on the server
     * @param msg
     */
    public async invoke(msg: Message) {
        const args = AddAdminRoles.getArgs(msg.content);
        if (args.length < 2) {
            msg.channel.send("No argument for role names provided.");
        } else {
            const roles = args.splice(1);
            for (const role of roles) {
                if (this.guildHandler.settings.adminRoles.includes(role)) {
                    this.guildHandler.settings.adminRoles.push(role);
                }
            }
            msg.channel.send(`Added **${roles.join("**, **")}** to the admin roles.`);
        }
    }
}
