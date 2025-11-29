import "server-only"


import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { getLocale } from "next-intl/server";

export const requireUser = cache(async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const locale = await getLocale();

    if (!session) {
        return redirect(`/${locale}/login`)
    }

    return session.user
})