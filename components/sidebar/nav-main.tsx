"use client";

import { IconCirclePlusFilled, type Icon } from "@tabler/icons-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleDashboardClick(e: React.MouseEvent) {
    e.preventDefault();
    // determine current locale from pathname (e.g. /en/...)
    const path = window.location.pathname;
    const parts = path.split("/").filter(Boolean);
    const locale = parts.length > 0 ? parts[0] : "";

    try {
      const res = await fetch("/api/session");
      if (!res.ok) throw new Error("failed to fetch session");
      const { user } = await res.json();

      if (user?.role === "admin") {
        router.push(`${locale ? `/${locale}` : ""}/admin`);
      } else if (user) {
        router.push(`${locale ? `/${locale}` : ""}/dashboard`);
      } else {
        router.push(`${locale ? `/${locale}` : ""}/login`);
      }
    } catch (err) {
      // fallback to generic dashboard route
      router.push("/dashboard");
    }
  }
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        {pathname.startsWith("/admin") && (
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2">
              <SidebarMenuButton
                asChild
                tooltip="Quick Create"
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
              >
                <Link href="/admin/courses/create">
                  <IconCirclePlusFilled />
                  <span>Quick Create</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}

        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} asChild>
                {item.url === "/dashboard" ? (
                  <button
                    onClick={handleDashboardClick}
                    className={cn(
                      "w-full text-left",
                      pathname === item.url &&
                        "bg-accent text-accent-foreground"
                    )}
                  >
                    {item.icon && (
                      <item.icon
                        className={cn(pathname === item.url && "text-primary")}
                      />
                    )}
                    <span>{item.title}</span>
                  </button>
                ) : (
                  <Link
                    href={item.url}
                    className={cn(
                      pathname === item.url &&
                        "bg-accent text-accent-foreground"
                    )}
                  >
                    {item.icon && (
                      <item.icon
                        className={cn(pathname === item.url && "text-primary")}
                      />
                    )}
                    <span>{item.title}</span>
                  </Link>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
