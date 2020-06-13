import {CommandCollection} from "../../lib/CommandCollection";
import {Ping} from "./utility/Ping";
import {Say} from "./utility/Say";
import { Help } from "./utility/Help";
import {Yell} from "./utility/Yell";
import { Die } from "./utility/Die";

export const globalCommands: CommandCollection<any> = new CommandCollection([
    Ping,
    Say,
    Yell,
    Die,
]);
