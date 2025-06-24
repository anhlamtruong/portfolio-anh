// Import command handler(s)
import { architectCommand } from "../commands/architect/index.js";

/**
 * Generates usage/help messages for the CLI.
 * @param cli_name - The name of the CLI tool.
 * @param command_name - The command to show usage for.
 * @returns An object containing usage messages.
 */
export const main_config_message = (cli_name: string, command_name: string) => {
  return {
    messages: {
      usage: `💥 Usage: npx ${cli_name} ${command_name} [--with-api] [--with-hooks] [--with-components]`,
    },
  };
};

/**
 * Configuration object for all supported CLI commands.
 * Each command can define its handler, supported flags, and flag aliases.
 */
export const commandConfigs = {
  cre: {
    handler: architectCommand,
    flags: ["with-api", "with-hooks", "with-components"],
    alias: {
      a: "with-api",
      h: "with-hooks",
      c: "with-components",
    },
  },
  push: {
    handler: architectCommand,
    flags: ["with-api", "with-hooks", "with-components"],
    alias: {
      a: "with-api",
      h: "with-hooks",
      c: "with-components",
    },
  },
};
