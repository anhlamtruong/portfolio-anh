import { commandConfigs } from "../config/index.js";
import minimist from "minimist";
export function parseArgs(argv) {
    const parsed = minimist(argv.slice(2));
    const [commandRaw, name] = parsed._;
    const command = commandRaw;
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
        var _a;
        const aliasKey = (_a = Object.entries(config.alias).find(([, long]) => long === flag)) === null || _a === void 0 ? void 0 : _a[0];
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
