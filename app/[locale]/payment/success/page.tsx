"use client";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useConfetti } from "@/hooks/use-confetti";
import { IconDashboard } from "@tabler/icons-react";
import { CheckIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useLocale } from "next-intl";

export default function PaymentSuccessfull() {
  const { triggerConfetti } = useConfetti();
  const locale = useLocale();

  useEffect(() => {
    triggerConfetti();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-1 justify-center items-center ">
      <Card className="w-[350px]">
        <CardContent>
          <div className="w-full flex justify-center">
            <CheckIcon className="size-12 p-2 bg-green-500/30 text-green-500 rounded-full" />
          </div>
          <div className="mt-3 text-center sm:mt-5 w-full">
            <h2 className="text-xl font-semibold">Order Created Successfully</h2>
            <p className="text-sm mt-2 text-muted-foreground tracking-tight text-balance">
              We will contact you via WhatsApp to confirm the order and activate the course. Thank you!
            </p>
            <Link
              href={`/${locale}/dashboard`}
              className={buttonVariants({ className: "w-full mt-5" })}
            >
              <IconDashboard className="size-5 " />
              Go to Dashboard
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
