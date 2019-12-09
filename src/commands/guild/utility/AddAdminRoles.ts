import {Message} from "discord.js";
import {GuildCommand} from "../../../lib/GuildCommand";
import {CommandPermission} from "../../../lib/CommandPermission";

export class AddAdminRoles extends GuildCommand {
    public static commandName = "addAdminRoles";
    public static permission = CommandPermission.ADMIN;

    /**
     * Adds an admin role to the admin role setting on the server
     * @param msg
     */
    public async invoke(msg: Message) {
        const args = AddAdminRoles.getArgs(msg.content);
        this.bot.logger.debug(args[0]);
        if (args.length < 2) {
            msg.channel.send("No argument for role names provided.");
        } else {
            const roles = args.splice(1);
            this.guildHandler.settings.adminRoles.push(...roles);
            msg.channel.send(`Added **${roles.join("**, **")}** to the admin roles.`);
        }
    }
}
