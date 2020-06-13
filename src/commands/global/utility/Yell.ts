import {Command} from "../../../lib/Command";
import {CommandPermission} from "../../../lib/CommandPermission";
import {Message} from "discord.js";
import {CommandCategory} from "../../CommandCategory";
import { Help } from "./Help";

export class Yell extends Command {
    public static commandName = "yell";
    public static category = CommandCategory.UTILITY;
    public static permission = CommandPermission.REGULAR;
    public static description = "Yells what you said.";

    /**
     * Replies with the current ping.
     * @param msg
     */
    public invoke(msg: Message): void {
        const msgContents = Yell.getArgs(msg.content);
        msgContents.shift();
        const replyContent = msgContents.join(" ");

        if (replyContent.replace(/\s/g, "").length > 0) {
            msg.channel.send(replyContent.toUpperCase());
        }
    }
}
