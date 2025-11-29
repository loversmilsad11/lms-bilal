"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  const locale = useLocale();
  
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">{t('platform')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('platformDesc')}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t('platformHeader')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${locale}/courses`} className="text-muted-foreground hover:text-primary transition-colors">
                  {t('browseCourses')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/instructors`} className="text-muted-foreground hover:text-primary transition-colors">
                  {t('instructors')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/pricing`} className="text-muted-foreground hover:text-primary transition-colors">
                  {t('pricing')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t('companyHeader')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${locale}/about`} className="text-muted-foreground hover:text-primary transition-colors">
                  {t('aboutUs')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/careers`} className="text-muted-foreground hover:text-primary transition-colors">
                  {t('careers')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-muted-foreground hover:text-primary transition-colors">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t('stayUpdated')}</h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button size="sm">{t('subscribe')}</Button>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {t('rights')}</p>
        </div>
      </div>
    </footer>
  );
}
