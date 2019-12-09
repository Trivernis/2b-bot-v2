import {GuildCommand} from "../../../lib/GuildCommand";
import {CommandPermission} from "../../../lib/CommandPermission";
import {Message} from "discord.js";

export class SetPrefix extends GuildCommand {
    public static commandName = "setPrefix";
    public static permission = CommandPermission.ADMIN;

    /**
     * Sets the prefix for a guild.
     * @param msg
     */
    public invoke(msg: Message): Promise<void> | void {
        const args = SetPrefix.getArgs(msg.content);
        if (args.length > 1) {
            const prefix: string = args[1];
            if (/^\S+$/.test(prefix)) {
                this.guildHandler.settings.prefix = prefix;
                msg.channel.send(`Changed the command prefix to **${prefix}**`);
            } else {
                msg.channel.send(`**${prefix}** Is not a valid prefix. \nA prefix must be a non-whitespace sequence of characters.`);
            }
        } else {
            msg.channel.send("You need to provide a prefix as commadn argument.");
        }
    }
}
