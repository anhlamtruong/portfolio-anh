import { capitalize } from "../utils/capitalize.js";
export function writeHooksTemplate(name) {
    return `import { useEffect } from "react";

export function use${capitalize(name)}() {
  useEffect(() => {
    console.log("${name} hook initialized");
  }, []);
}`;
}
