import {Message} from "discord.js";
import {CommandPermission} from "../CommandPermission";
import {CommandCollection} from "../CommandCollection";
import {Command} from "../Command";

/**
 * Parses a message and returns the corresponding command.
 * @param message
 * @param commandCollection
 * @param prefix
 * @param userPermission
 */
export function parseMessage(message: Message, commandCollection: CommandCollection<any>,
                             prefix: string, userPermission: CommandPermission = 0): any {

    const commandPattern = new RegExp( `\\s*${prefix}(\\w+)`);

    if (commandPattern.test(message.content)) {
        const commandString = commandPattern.exec(message.content)[1];
        const CommandClass = commandCollection.findByName(commandString);

        if (CommandClass) {
            if (CommandClass.permission <= userPermission) {
                return CommandClass;
            } else {
                message.channel.send("You don't have permission for that command.");
            }
        }
    }
    return false;
}
