"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/public/logo.png";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { authClient } from "@/lib/auth-client";
import { buttonVariants } from "@/components/ui/button";
import UserDropdown from "./UserDropdown";
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from "@/components/LanguageSwitcher";

function Navbar() {
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const { data: session, isPending } = authClient.useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: t('home'), href: `/${locale}` },
    { name: t('courses'), href: `/${locale}/courses` },
    { name: t('instructors'), href: `/${locale}/instructors` },
    { name: t('about'), href: `/${locale}/about` },
    { name: t('careers'), href: `/${locale}/careers` },
    { name: t('dashboard'), href: `/${locale}/dashboard` },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-[backdrop-filter]:bg-background/60">
      <div className="container flex min-h-16 items-center max-auto px-4 md:px-6 lg:px-8">
        <Link href={`/${locale}`} className="flex items-center gap-2 me-4">
          <Image src={logo} alt="logo" className="size-12" />
          <span className="font-bold">BilalLMS.</span>
        </Link>

        {/* desktop navigation */}
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
            {isPending ? null : session ? (
              <UserDropdown
                email={session.user.email}
                image={
                  session?.user.image ??
                  `https://avatar.vercel.sh/${session?.user.email}`
                }
                name={
                  session?.user.name && session.user.name.length > 0
                    ? session.user.name
                    : session?.user.email.split("@")[0]
                }
              />
            ) : (
              <>
                <Link
                  href={`/${locale}/login`}
                  className={buttonVariants({ variant: "secondary" })}
                >
                  {t('login')}
                </Link>
                <Link href={`/${locale}/login`} className={buttonVariants()}>
                  {t('getStarted')}
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* mobile menu button */}
        <div className="flex flex-1 items-center justify-end gap-4 md:hidden">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t md:hidden">
          <div className="container px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium transition-colors hover:text-primary py-2"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col space-y-3 pt-4 border-t">
              {isPending ? null : session ? (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{t('account')}</span>
                  <UserDropdown
                    email={session.user.email}
                    image={
                      session?.user.image ??
                      `https://avatar.vercel.sh/${session?.user.email}`
                    }
                    name={
                      session?.user.name && session.user.name.length > 0
                        ? session.user.name
                        : session?.user.email.split("@")[0]
                    }
                  />
                </div>
              ) : (
                <>
                  <Link
                    href={`/${locale}/login`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={buttonVariants({
                      variant: "secondary",
                      className: "w-full justify-center",
                    })}
                  >
                    {t('login')}
                  </Link>
                  <Link
                    href={`/${locale}/login`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={buttonVariants({
                      className: "w-full justify-center",
                    })}
                  >
                    {t('getStarted')}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
