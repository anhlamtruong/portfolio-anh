export function writeApiTemplate(name: string): string {
  return `import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: "${name} API working!" });
}`;
}
