import { currentUser } from "@/services/authenticate-service/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await currentUser();

    return NextResponse.json(user);
  } catch (error) {
    console.log(error, "SAVE USER SETTING ERROR");
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}
