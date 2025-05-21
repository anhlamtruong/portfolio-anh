export const messages = {
  usage:
    "Usage: npx my-cli add <name> [--with-api] [--with-hooks] [--with-components]",
  noName: "❌ Please provide a name.\nExample: npx my-cli add <name>",
  alreadyExists: (name: string) => `❌ The route "${name}" already exists.`,
  success: (name: string) =>
    `✅ Microservice folder '${name}' created successfully.`,
};

export const file_directory = {
  main_directory: "src/app",
};

export const folder_naming = {
  api: "api",
  hooks: "hooks",
  components: "components",
};

export const file_naming = {
  page: "page.tsx",
  route: "route.ts",
  components: "components.ts",
};

export const flags = {
  api: "with-api",
  hooks: "with-hooks",
  components: "with-components",
};
