import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { capitalize } from "./utils/capitalize.js";
import { messages, file_directory, file_naming, flags as flags_options, folder_naming, } from "./config/index.js";
import { writeApiTemplate } from "./template/api-template.js";
import { writeHooksTemplate } from "./template/hooks-template.js";
import { writePageTemplate } from "./template/page-template.js";
import { writeComponentTemplate } from "./template/component-template.js";
// Get __filename and __dirname in ES module context
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const __dirname = path.dirname(__filename);
/**
 * Main handler for the 'architect' CLI command.
 * Generates a microservice folder structure with optional API, hooks, and components.
 */
export function architectCommand({ name, flags }) {
    // Validate that a name was provided
    if (!name) {
        console.error(messages.noName);
        process.exit(1);
    }
    // Determine which optional features to generate based on flags
    const options = {
        withApi: flags[flags_options.api],
        withHooks: flags[flags_options.hooks],
        withComponents: flags[flags_options.components],
    };
    // Compute the target directory for the new microservice
    const routeFolder = path.join(process.cwd(), file_directory.main_directory, name);
    // Prevent overwriting if the folder already exists
    if (fs.existsSync(routeFolder)) {
        console.error(messages.alreadyExists(name));
        process.exit(1);
    }
    // Create the main directory and page file
    fs.mkdirSync(routeFolder, { recursive: true });
    fs.writeFileSync(path.join(routeFolder, file_naming.page), writePageTemplate(name));
    // Optionally generate API folder and template
    if (options.withApi) {
        const apiPath = path.join(routeFolder, folder_naming.api);
        console.log(`Generate API 💻: ${apiPath}`);
        fs.mkdirSync(apiPath);
        fs.writeFileSync(path.join(apiPath, file_naming.route), writeApiTemplate(name));
    }
    // Optionally generate hooks folder and template
    if (options.withHooks) {
        const hooksPath = path.join(routeFolder, folder_naming.hooks);
        console.log(`Generate Hooks 🪝: ${hooksPath}`);
        fs.mkdirSync(hooksPath);
        fs.writeFileSync(path.join(hooksPath, `use${capitalize(name)}.ts`), writeHooksTemplate(name));
    }
    // Optionally generate components folder and template
    if (options.withComponents) {
        const componentsPath = path.join(routeFolder, folder_naming.components);
        console.log(`Generate Components 🧱: ${componentsPath}`);
        fs.mkdirSync(componentsPath);
        fs.writeFileSync(path.join(componentsPath, `${capitalize(name)}Widget.tsx`), writeComponentTemplate(name));
    }
    // Success message
    console.log(`✅ Microservice '${name}' created successfully.`);
}
