import {Bot} from "../Bot";
import {Constructable, Guild, GuildMember, Message} from "discord.js";
import {Guild as GuildData} from "./models/Guild";
import {GuildSettings} from "./GuildSettings";
import {CommandPermission} from "./CommandPermission";
import {CommandCollection} from "./CommandCollection";
import {guildCommands} from "../commands/guild";
import {globalCommands} from "../commands/global";
import {Command} from "./Command";
import {BotLogger} from "./utils/BotLogger";
import {ProxyEventEmitter} from "./utils/ProxyEventEmitter";

/**
 * Handles all guild related tasks.
 */
export class GuildHandler {
    private guild: Guild;
    private bot: Bot;
    private guildData: GuildData;
    private guildSettings: GuildSettings;
    private guildSettingsProxy: ProxyEventEmitter;
    private commandCollection: CommandCollection<any>;
    public readonly logger: BotLogger;

    /**
     * constructor
     * @param bot
     * @param guild
     */
    constructor(bot: Bot, guild: Guild) {
        this.guild = guild;
        this.bot = bot;
        this.logger = bot.logger;
        this.commandCollection = new CommandCollection();
        this.commandCollection.include(guildCommands);
        this.commandCollection.include(globalCommands);
    }

    /**
     * Inits the guild by loading the data from the database.
     */
    public async init(): Promise<void> {
        this.guildData = await this.bot.dataHandler.getGuild(this.guild.id);
        this.logger.debug(`Guild Data is ${this.guildData.guildId}: ${JSON.stringify(this.guildData.settings)}`);
        const guildSettings = this.guildData.settings as unknown as GuildSettings;
        this.guildSettingsProxy = new ProxyEventEmitter();
        this.guildSettingsProxy.on("change", () => this.saveGuildSettings());
        this.guildSettingsProxy.on("set", () => this.saveGuildSettings());
        this.guildSettings = this.guildSettingsProxy.proxify(guildSettings);
    }

    /**
     * Getter for the guild settings.
     */
    public get settings(): GuildSettings {
        return this.guildSettings;
    }

    /**
     * The function is called when a mesage is sent to the guild.
     * @param message
     */
    public async onMessage(message: Message): Promise<void> {
        const commandPattern = new RegExp( `\\s*${this.guildSettings.prefix}(\\w+)`);

        this.logger.debug(`Command Pattern is: ${commandPattern}`);
        this.logger.debug(`<${this.guild.name}:${message.author.tag}>"${message.content}"`);

        if (commandPattern.test(message.content)) {
            this.logger.debug("Message matches command syntax.");
            const commandString = commandPattern.exec(message.content)[1];
            const CommandClass = this.commandCollection.findByName(commandString);

            if (CommandClass) {
                this.logger.debug(`${commandString} -> ${CommandClass.name}`);
                this.logger.debug(`Member Permission: ${this.getMembersHighestRole(message.member)}, command permission: ${CommandClass.permission}`);
                if (CommandClass.permission <= this.getMembersHighestRole(message.member)) {
                    const command = new CommandClass(this.bot, this);
                    await command.invoke(message);
                } else {
                    message.channel.send("You don't have permission for that command.");
                }
            }
        }
    }

    /**
     * Saves the guild settings back into the database.
     */
    public async saveGuildSettings(): Promise<void> {
        this.logger.debug(`Changing Guild Settings for ${this.guild.name}.`);
        await this.guildData.update({settings: this.guildSettings});
    }

    /**
     * Returns the highest role of the guild member.
     * @param guildMember
     */
    private getMembersHighestRole(guildMember: GuildMember) {
        const adminRoles = this.guildSettings.adminRoles;
        const djRoles = this.guildSettings.djRoles;
        if (adminRoles.find((role) => GuildHandler.memberHasRole(guildMember, role)).length > 0) {
            return CommandPermission.ADMIN;
        } else if (djRoles.find((role) => GuildHandler.memberHasRole(guildMember, role)).length > 0) {
            return CommandPermission.DJ;
        } else {
            return CommandPermission.REGULAR;
        }
    }

    /**
     * Returns if a guild member has a role (by role name).
     * @param guildMember
     * @param roleName
     */
    private static memberHasRole(guildMember: GuildMember, roleName: string) {
        return guildMember.roles.filter((role, key) => role.name === roleName).size > 0;
    }
}
