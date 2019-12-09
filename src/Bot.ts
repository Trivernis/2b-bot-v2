import {Client, Guild} from "discord.js";
import {Config} from "./lib/utils/Config";
import {DefaultConfig} from "./lib/utils/DefaultConfig";
import * as path from "path";
import * as fsx from "fs-extra";
import * as yaml from "js-yaml";
import {BotLogger} from "./lib/utils/BotLogger";
import {DataHandler} from "./lib/DataHandler";
import {GuildHandler} from "./lib/GuildHandler";
import {CommandCollection} from "./lib/CommandCollection";
import {Command} from "./lib/Command";
import {globalCommands} from "./commands/global";
import {privateCommands} from "./commands/private";
import {parseMessage} from "./lib/utils";
import {CommandPermission} from "./lib/CommandPermission";

const configFile = "config.yaml";

/**
 * The main class of the bot.
 */
export class Bot {
    public readonly client: Client;
    public readonly config: Config;
    public readonly logger: BotLogger;
    public readonly dataHandler: DataHandler;
    private commandCollection: CommandCollection<Command>;
    private guildHandlers: any = {};

    /**
     * constructor
     */
    constructor() {
        this.config = Bot.loadConfig();
        this.logger = new BotLogger(this.config.logging.directory, this.config.logging.level);
        this.client = new Client();
        this.dataHandler = new DataHandler(this);
        this.commandCollection = new CommandCollection<Command>();
        this.commandCollection.include(globalCommands);
        this.commandCollection.include(privateCommands);
    }

    /**
     * Starts the bot.
     */
    public async start(): Promise<void> {
        await this.dataHandler.init();
        this.logger.debug(`Config is ${JSON.stringify(this.config)}`);
        await this.client.login(this.config.botToken);
        this.logger.info(`Logged in as ${this.client.user.tag}`);
        this.registerEvents();
    }

    /**
     * Loads the config file or creates one if none exists.
     */
    private static loadConfig(): Config {
        const configPath: string = path.join(__dirname, "../", configFile);
        if (!fsx.existsSync(configPath)) {
            const configString: string = yaml.safeDump(new DefaultConfig());
            fsx.writeFileSync(configPath, configString);
            // tslint:disable-next-line:no-console
            console.log("-----------------");
            // tslint:disable-next-line:no-console
            console.log("Please edit the config before starting the bot.");
            process.exit(0);
        } else {
            const configString = fsx.readFileSync(configPath, "utf-8");
            return Object.assign(new DefaultConfig(), yaml.safeLoad(configString));
        }
    }

    /**
     * Registers all events the bot needs.
     */
    private registerEvents(): void {
        this.client.on("message", async (message) => {
            if (message.author !== this.client.user) {
                if (message.guild) {
                    const handler = await this.getGuildHandler(message.guild);
                    await handler.onMessage(message);
                } else {
                    this.logger.debug(`<PM: ${message.author.tag}> ${message.content}`);
                    const userPermission = this.config.owners.includes(message.author.tag) ?
                        CommandPermission.OWNER : CommandPermission.REGULAR;
                    const CommandClass = parseMessage(message, this.commandCollection,
                        this.config.prefix, userPermission);
                    if (CommandClass) {
                        const command = new CommandClass(this);
                        command.invoke(message);
                    }
                }
            }
        });
    }

    /**
     * Returns the guild handler for a guild and creates one if it doesn't exist.
     * @param guild
     */
    private async getGuildHandler(guild: Guild): Promise<GuildHandler> {
        let handler = this.guildHandlers[guild.id];
        if (!handler) {
            handler = new GuildHandler(this, guild) as GuildHandler;
            await handler.init();
            this.guildHandlers[guild.id] = handler;
        }
        return handler;
    }
}
