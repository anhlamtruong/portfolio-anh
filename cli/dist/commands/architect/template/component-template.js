import { capitalize } from "../utils/capitalize.js";
export function writeComponentTemplate(name) {
    return `export function ${capitalize(name)}Widget() {
    return <div>${capitalize(name)} Widget</div>;
  }`;
}
