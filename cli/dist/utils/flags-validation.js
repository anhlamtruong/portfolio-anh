import { commandConfigs } from "../config/index.js";
import chalk from "chalk";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateFlags(command, flags) {
    const config = commandConfigs[command];
    const unknown = Object.keys(flags).filter((key) => key !== "_" &&
        !config.flags.includes(key) &&
        !Object.keys(config.alias).includes(key));
    if (unknown.length > 0) {
        console.error(chalk.red(`❌ Unknown flag(s): ${unknown.join(", ")}`));
        console.log(chalk.yellow("👉 Valid flags:"));
        config.flags.forEach((flag) => {
            var _a;
            const short = (_a = Object.entries(config.alias).find(([, long]) => long === flag)) === null || _a === void 0 ? void 0 : _a[0];
            const aliasStr = short ? chalk.cyan(`(-${short})`) : "";
            console.log(chalk.green(`  --${flag}`), aliasStr);
        });
        process.exit(1);
    }
}
