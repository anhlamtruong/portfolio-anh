#!/usr/bin/env node

// Import necessary configurations and utility functions
import { commandConfigs, main_config_message } from "./config/index.js";
import { parseArgs } from "./utils/parse-args.js";

// Parse command-line arguments
const { command, name, flags } = parseArgs(process.argv);

// Log parsed arguments for debugging purposes
console.log("Command:", command);
console.log("Name:", name);
console.log("Flags:", flags);

// Retrieve the configuration for the specified command
const config = commandConfigs[command];

// Check if the command has a valid handler function
if (config && typeof config.handler === "function") {
  // Execute the handler with the parsed arguments
  config.handler({ name, flags });
} else {
  // If no valid handler is found, display usage information
  const mess = main_config_message("tac", command);
  console.log(mess.messages.usage);
}
