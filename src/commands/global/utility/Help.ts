import {Command} from "../../../lib/Command";
import {Message, RichEmbed} from "discord.js";
import {CommandCollection} from "../../../lib/CommandCollection";
import {globalCommands} from "../index";
import {guildCommands} from "../../guild";
import {privateCommands} from "../../private";
import {CommandCategory} from "../../CommandCategory";
import {ExtendedMessage} from "../../../lib/ExtendedMessage";
import {CommandPermission} from "../../../lib/CommandPermission";

export class Help extends Command {
    public static commandName = "help";
    public static description = "Shows a help for commands.";
    public static usage = "help [<command>]";
    public static category = CommandCategory.UTILITY;
    public allCommands: CommandCollection<any> = new CommandCollection<any>(
        [...globalCommands, ...guildCommands, ...privateCommands]);

    /**
     * Shows a help embed.
     * If an argument is provided the specific help for that command is shown.
     * @param msg
     * @param exMsg
     */
    public invoke(msg: Message, exMsg: ExtendedMessage): void {
        const args = exMsg.args;
        const helpEmbed = new RichEmbed();

        helpEmbed.setTitle("Help");
        if (args.length === 0) {
            msg.channel.send("", this.getOverviewHelpEmbed(exMsg));
        } else {
            const commandHelp = this.getCommandHelpEmbed(exMsg);
            if (commandHelp) {
                msg.channel.send("", commandHelp);
            } else {
                msg.channel.send(`The command **${args[0]}** could not be found.`);
            }
        }
    }

    /**
     * Returns a help embed for the provided command.
     * @param exMsg
     */
    private getCommandHelpEmbed(exMsg: ExtendedMessage): RichEmbed {
        const CommandClass = this.allCommands.findByName(exMsg.args[0]);

        if (CommandClass) {
            const helpEmbed = new RichEmbed();
            helpEmbed.setTitle(`Help for **${CommandClass.commandName}**`);
            helpEmbed.addField("Description", CommandClass.description || "*No description entity found.*");
            helpEmbed.addField("Usage",
                `\`${exMsg.prefix}${CommandClass.usage || CommandClass.commandName}\``, true);
            let permissionNeeded: string;
            switch (CommandClass.permission as CommandPermission) {
                case CommandPermission.OWNER:
                    permissionNeeded = "Owner";
                    break;
                case CommandPermission.ADMIN:
                    permissionNeeded = "Admin";
                    break;
                case CommandPermission.DJ:
                    permissionNeeded = "DJ";
                    break;
                case CommandPermission.REGULAR:
                default:
                    permissionNeeded = "None";
                    break;
            }
            helpEmbed.addField("Permission Level", permissionNeeded, true);
            return helpEmbed;
        }
    }

    /**
     * Returns a rich embed containing an overview of all the available commands.
     * @param exMsg
     */
    private getOverviewHelpEmbed(exMsg: ExtendedMessage): RichEmbed {
        const helpEmbed = new RichEmbed();
        const commandsByCategory: any = {};
        helpEmbed.setDescription(
            `Use \`${exMsg.prefix}\`help [command] for more info on a command.`);
        for (const CommandClass of this.allCommands) {
            const category: string = CommandClass.category;
            if (!commandsByCategory[Help.category]) {
                commandsByCategory[category] = "";
            }
            commandsByCategory[category] += `\`${CommandClass.commandName}\`\t`;
        }
        for (const category in commandsByCategory) {
            if (commandsByCategory.hasOwnProperty(category)) {
                helpEmbed.addField(category, commandsByCategory[category]);
            }
        }
        return helpEmbed;
    }
}