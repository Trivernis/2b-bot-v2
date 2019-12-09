import {CommandCollection} from "../../lib/CommandCollection";
import {AddAdminRoles} from "./utility/AddAdminRoles";

export const guildCommands = new CommandCollection([
    AddAdminRoles,
]);
