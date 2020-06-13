import {Table, Column, Model, NotNull} from "sequelize-typescript";
import {JSON as SQJSON} from "sequelize";
import {GuildSettings} from "../GuildSettings";
import {DefaultConfig} from "../utils/DefaultConfig";

@Table({underscored: true})
export class Guild extends Model<Guild> {

    @NotNull
    @Column({allowNull: false})
    public guildId: string;

    @NotNull
    // @ts-ignore
    @Column({allowNull: false, type: SQJSON, defaultValue: new GuildSettings(new DefaultConfig())})
    public settings: GuildSettings;
}
