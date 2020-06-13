import {Command} from "../../../lib/Command";
import {CommandPermission} from "../../../lib/CommandPermission";
import {Message} from "discord.js";
import {CommandCategory} from "../../CommandCategory";
import { Help } from "./Help";

export class Die extends Command {
    public static commandName = "die";
    public static category = CommandCategory.UTILITY;
    public static permission = CommandPermission.OWNER;
    public static description = "Kills the bot.";

    /**
     * Replies with the current ping.
     * @param msg
     */
    public async invoke(msg: Message): Promise<void> {
        await msg.channel.send("AAAAAARRRGGHHH...");
        await msg.client.destroy();
        process.exit(0);
    }
}
