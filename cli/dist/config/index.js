import { architectCommand } from "../commands/architect/index.js";
export const main_config_message = (cli_name, command_name) => {
    return {
        messages: {
            usage: `💥 Usage: npx ${cli_name} ${command_name} [--with-api] [--with-hooks] [--with-components]`,
        },
    };
};
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
