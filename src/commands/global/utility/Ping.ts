import {Command} from "../../../lib/Command";
import {CommandPermission} from "../../../lib/CommandPermission";
import {Message} from "discord.js";

export class Ping extends Command {
    public static commandName = "ping";
    public static permission = CommandPermission.REGULAR;
    public static description = "Replies with the bots ping.";

    /**
     * Replies with the current ping.
     * @param msg
     */
    public invoke(msg: Message): void {
        msg.channel.send(`My latency is **${Math.round(this.bot.client.ping)}** ms.`);
    }
}
