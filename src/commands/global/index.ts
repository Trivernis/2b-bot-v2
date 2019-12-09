import {CommandCollection} from "../../lib/CommandCollection";
import {Ping} from "./utility/Ping";

export const globalCommands = new CommandCollection([
    Ping,
]);
