// Import command configurations and chalk for colored output
import { commandConfigs } from "../config/index.js";
import chalk from "chalk";
/**
 * Validates the provided flags for a given command.
 * If unknown flags are found, prints an error and exits the process.
 * @param command - The CLI command to validate flags for
 * @param flags - The parsed flags object
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateFlags(command, flags) {
    // Get the config for the specified command
    const config = commandConfigs[command];
    // Identify unknown flags (not in config.flags or config.alias)
    const unknown = Object.keys(flags).filter((key) => key !== "_" &&
        !config.flags.includes(key) &&
        !Object.keys(config.alias).includes(key));
    // If there are unknown flags, print error and usage, then exit
    if (unknown.length > 0) {
        console.error(chalk.red(`❌ Unknown flag(s): ${unknown.join(", ")}`));
        console.log(chalk.yellow("👉 Valid flags:"));
        config.flags.forEach((flag) => {
            var _a;
            // Find the short alias for the flag, if any
            const short = (_a = Object.entries(config.alias).find(([, long]) => long === flag)) === null || _a === void 0 ? void 0 : _a[0];
            const aliasStr = short ? chalk.cyan(`(-${short})`) : "";
            console.log(chalk.green(`  --${flag}`), aliasStr);
        });
        process.exit(1);
    }
}
