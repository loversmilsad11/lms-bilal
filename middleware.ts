import arcjet, { createMiddleware, detectBot } from "@arcjet/next";
import { NextRequest, NextResponse } from "next/server";

const aj = arcjet({
    key: process.env.ARCJET_KEY!,
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
    // Better-auth uses "better-auth.session_token" as the default cookie name
    const sessionCookie = request.cookies.get("better-auth.session_token");
    
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
    runtime: "experimental-edge", // Use experimental-edge runtime
};

export default createMiddleware(aj, async (request: NextRequest) => {
    if (request.nextUrl.pathname.startsWith("/admin")) {
        return adminMiddleware(request);
    }
    return NextResponse.next();
});