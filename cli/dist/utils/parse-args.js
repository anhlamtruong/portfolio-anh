import { commandConfigs } from "../config/index.js";
import minimist from "minimist";
/**
 * Parses command-line arguments and normalizes flags/aliases.
 * @param argv - The process.argv array from Node.js
 * @returns An object containing the parsed command, name, and flags
 */
export function parseArgs(argv) {
    // Initial parse to extract command and name
    const parsed = minimist(argv.slice(2));
    const [commandRaw, name] = parsed._;
    const command = commandRaw;
    // Validate that the command exists in the configuration
    if (!Object.prototype.hasOwnProperty.call(commandConfigs, command)) {
        console.error(`❌ Unknown command: ${commandRaw}`);
        process.exit(1);
    }
    const config = commandConfigs[command];
    // Re-parse arguments with correct alias and boolean flag settings
    const parsedWithConfig = minimist(argv.slice(2), {
        alias: config.alias,
        boolean: config.flags,
    });
    // Normalize flag values so both long and short forms are recognized
    config.flags.forEach((flag) => {
        var _a;
        const aliasKey = (_a = Object.entries(config.alias).find(([, long]) => long === flag)) === null || _a === void 0 ? void 0 : _a[0];
        if (aliasKey) {
            parsedWithConfig[flag] =
                parsedWithConfig[flag] || parsedWithConfig[aliasKey];
        }
    });
    // Return the parsed command, name, and normalized flags
    return {
        command,
        name,
        flags: parsedWithConfig,
    };
}
