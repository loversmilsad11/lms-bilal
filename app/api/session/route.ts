import { auth } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const session = await auth.api.getSession({ headers: req.headers });
    return new Response(JSON.stringify({ user: session?.user ?? null }), {
        headers: { "Content-Type": "application/json" },
    });
}
