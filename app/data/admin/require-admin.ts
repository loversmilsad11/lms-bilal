import "server-only"

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { getLocale } from "next-intl/server";

export const requireAdmin = cache(async () => {
    const locale = await getLocale();
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session) {
        return redirect(`/${locale}/login`)
    }

    if (session.user.role !== "admin") {
        return redirect(`/${locale}/not-admin`)
    }

    return session

})

