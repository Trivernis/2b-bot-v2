import {Table, Column, Model, NotNull} from "sequelize-typescript";
import {JSON as SQJSON} from "sequelize";
import {GuildSettings} from "../GuildSettings";

@Table({underscored: true})
export class Guild extends Model<Guild> {

    @NotNull
    @Column({allowNull: false})
    public guildId: string;

    @NotNull
    @Column({allowNull: false, type: SQJSON, defaultValue: new GuildSettings()})
    public settings: GuildSettings;
}
