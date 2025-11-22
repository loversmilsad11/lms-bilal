"use client";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeftIcon, XIcon } from "lucide-react";
import Link from "next/link";

export default function PaymentCancelled() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-background">
      <Card className="w-[350px] shadow-md">
        <CardContent className="pt-8 text-center">
          <div className="w-full flex justify-center mb-3">
            <XIcon className="size-12 p-2 bg-red-500/30 text-red-500 rounded-full" />
          </div>

          <h2 className="text-xl font-semibold">Payment Cancelled</h2>
          <p className="text-sm mt-2 text-muted-foreground tracking-tight text-balance">
            No worries, you won’t be charged. Please try again when you’re
            ready!
          </p>

          <Link
            href="/"
            className={buttonVariants({ className: "w-full mt-5" })}
          >
            <ArrowLeftIcon className="size-5 mr-1" />
            Go back to Home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
