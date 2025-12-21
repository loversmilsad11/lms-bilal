"use client"

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useLocale } from "next-intl";

export function useSignOut() {
    const router = useRouter()
    const locale = useLocale();
    const handleSignout = async function signOut() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push(`/${locale}`);
                    toast.success("Singed out Successfully");
                },
                onError: () => {
                    toast.error("Failed to sign out");
                },
            },
        });
    }

    return handleSignout

}