import { capitalize } from "../utils/capitalize.js";

export function writeComponentTemplate(name: string): string {
  return `export function ${capitalize(name)}Widget() {
    return <div>${capitalize(name)} Widget</div>;
  }`;
}
