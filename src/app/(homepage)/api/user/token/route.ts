import { auth } from "@/auth";
import { encode } from "@auth/core/jwt";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const salt = crypto.randomBytes(16).toString("hex");

  const jwt = await encode({
    secret: process.env.AUTH_SECRET!,
    salt,
    token: {
      sub: session.user.id,
      email: session.user.email,
      role: session.user.role,
      name: session.user.name,
    },
  });

  return NextResponse.json({ token: jwt });
}
