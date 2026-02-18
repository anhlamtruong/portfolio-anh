declare module "culori" {
  export interface Hsl {
    mode: "hsl";
    h?: number;
    s: number;
    l: number;
    alpha?: number;
  }

  export interface Oklch {
    mode: "oklch";
    l: number;
    c: number;
    h?: number;
    alpha?: number;
  }

  export function parse(color: string): Record<string, unknown> | undefined;
  export function converter(mode: "hsl"): (color: Record<string, unknown>) => Hsl;
  export function converter(mode: "oklch"): (color: Record<string, unknown>) => Oklch;
  export function converter(mode: string): (color: Record<string, unknown>) => Record<string, unknown>;
  export function formatRgb(color: Record<string, unknown>): string;
  export function formatHex(color: Record<string, unknown>): string;
}

declare module "@ngard/tiny-isequal" {
  export function isEqual(a: unknown, b: unknown): boolean;
}
