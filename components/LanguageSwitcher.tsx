"use client";

import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    startTransition(() => {
      // We need to construct the new path. 
      // Since we are using next-intl middleware, we can just replace the locale segment or push to the new locale.
      // However, router.push might not automatically handle the locale prefix switch if we just pass the path.
      // A safer way with standard Next.js router is to manipulate the window location or use a path helper.
      // But let's try a simple replacement of the first segment if it matches the current locale.
      
      const currentPath = window.location.pathname;
      const segments = currentPath.split('/');
      // segments[0] is empty, segments[1] is likely the locale
      if (segments[1] === locale) {
        segments[1] = nextLocale;
      } else {
        // If locale is missing (default locale hidden), we prepend it.
        // But our middleware config might enforce it.
        // Let's assume standard behavior: /en/... -> /ar/...
        segments[1] = nextLocale;
      }
      const newPath = segments.join('/');
      router.push(newPath);
    });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      disabled={isPending}
      className="font-semibold"
    >
      {locale === "en" ? "العربية" : "English"}
    </Button>
  );
}
