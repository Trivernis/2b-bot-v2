import {CommandCollection} from "../../lib/CommandCollection";
import {AddAdminRoles} from "./utility/AddAdminRoles";
import {SetPrefix} from "./utility/SetPrefix";
import {RemoveAdminRoles} from "./utility/RemoveAdminRoles";

export const guildCommands = new CommandCollection([
    AddAdminRoles,
    SetPrefix,
    RemoveAdminRoles,
]);
