"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { enrollInCourseAction } from "../actions";
import { tryCatch } from "@/hooks/try-catch";
import { Loader2, MessageCircle } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export function EnrollmentButton({
  courseId,
  courseTitle,
  coursePrice,
  whatsappNumber,
}: {
  courseId: string;
  courseTitle?: string;
  coursePrice?: number;
  whatsappNumber?: string;
}) {
  const [Pending, startTransition] = useTransition();
  const { data: session } = authClient.useSession();
  const whatsapp = whatsappNumber || "213777321649";

  function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        enrollInCourseAction(courseId)
      );

      if (error) {
        console.error("Enrollment error:", error);
        toast.error(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again"
        );
        return;
      }

      if (!result) {
        toast.error("No response received");
        return;
      }

      if (result.status === "error") {
        toast.error(result.message);
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);

        // Open WhatsApp with pre-filled message
        if (result.enrollmentId) {
          const buyerName =
            session?.user?.name ?? session?.user?.email ?? "Guest";
          const whatsappMessage = encodeURIComponent(
            `Hello, my name is ${buyerName}. I want to purchase the course: ${
              courseTitle || "Course"
            }\nPrice: ${coursePrice ? `${coursePrice} DZD` : ""}\nOrder ID: ${result.enrollmentId}`
          );
          const whatsappUrl = `https://wa.me/${whatsapp}?text=${whatsappMessage}`;
          window.open(whatsappUrl, "_blank");
        }
      }
    });
  }

  return (
    <div className="space-y-2">
      <Button onClick={onSubmit} disabled={Pending} className="w-full">
        {Pending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Buy Now - Cash on Delivery"
        )}
      </Button>
      <Link
        href={`https://wa.me/${whatsapp}`}
        target="_blank"
        className="flex items-center justify-center gap-2 w-full text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <MessageCircle className="size-4" />
        Contact us via WhatsApp
      </Link>
    </div>
  );
}
