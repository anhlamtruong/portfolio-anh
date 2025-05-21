import { commandConfigs } from "../config/index.js";
import minimist from "minimist";

export function parseArgs(argv: string[]) {
  const parsed = minimist(argv.slice(2));
  const [commandRaw, name] = parsed._;
  type CommandKey = keyof typeof commandConfigs;
  const command = commandRaw as CommandKey;

  if (!Object.prototype.hasOwnProperty.call(commandConfigs, command)) {
    console.error(`❌ Unknown command: ${commandRaw}`);
    process.exit(1);
  }
  const config = commandConfigs[command];

  // Re-parse with correct alias/boolean settings
  const parsedWithConfig = minimist(argv.slice(2), {
    alias: config.alias,
    boolean: config.flags,
  });

  // Normalize aliases
  config.flags.forEach((flag) => {
    const aliasKey = Object.entries(config.alias).find(
      ([, long]) => long === flag
    )?.[0];
    if (aliasKey) {
      parsedWithConfig[flag] =
        parsedWithConfig[flag] || parsedWithConfig[aliasKey];
    }
  });

  return {
    command,
    name,
    flags: parsedWithConfig,
  };
}
