#!/usr/bin/env node

import { commandConfigs, main_config_message } from "./config/index.js";
import { parseArgs } from "./utils/parse-args.js";

const { command, name, flags } = parseArgs(process.argv);

console.log("Command:", command);
console.log("Name:", name);
console.log("Flags:", flags);

const config = commandConfigs[command];

if (config && typeof config.handler === "function") {
  config.handler({ name, flags });
} else {
  const mess = main_config_message("tac", command);
  console.log(mess.messages.usage);
}
