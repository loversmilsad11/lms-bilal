import arcjet, { createMiddleware, detectBot } from "@arcjet/next";
import { env } from "./lib/env";
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const aj = arcjet({
    key: env.ARCJET_KEY!,
    rules: [
        detectBot({
            mode: "LIVE",
            allow: [
                "CATEGORY:SEARCH_ENGINE",
                "CATEGORY:MONITOR",
                "CATEGORY:PREVIEW",
            ],
        }),
    ],
});

function adminMiddleware(request: NextRequest) {
    // Check if session cookie exists (basic check without Prisma)
    const sessionCookie = getSessionCookie(request);
    
    // If no session cookie, redirect to login
    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Note: Role check is done in layout/page level where Prisma is available
    // This middleware only checks for session existence
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};

export default createMiddleware(aj, async (request: NextRequest) => {
    if (request.nextUrl.pathname.startsWith("/admin")) {
        return adminMiddleware(request);
    }
    return NextResponse.next();
});