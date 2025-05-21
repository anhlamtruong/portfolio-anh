import { capitalize } from "../utils/capitalize.js";

export function writePageTemplate(name: string): string {
  return `export default function ${capitalize(name)}Page() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">${capitalize(name)} Page</h1>
    </div>
  );
}`;
}
