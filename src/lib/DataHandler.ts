import {Bot} from "../Bot";
import {Sequelize} from "sequelize-typescript";
import {Guild} from "./models/Guild";

export class DataHandler {

    private sequelize: Sequelize;

    /**
     * Constructor that initializes the sequelize models
     * @param bot
     */
    constructor(bot: Bot) {
        this.sequelize = new Sequelize(bot.config.dbUri);
        this.sequelize.addModels([
            Guild,
        ]);
    }

    /**
     * Async init operations on the database.
     */
    public async init() {
        await this.sequelize.sync();
    }

    /**
     * Returns the guild entry for a guild id.
     * @param guildId
     */
    public async getGuild(guildId: string) {
        return (await Guild.findOrCreate({where: {guildId}}))[0];
    }
}
