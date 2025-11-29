"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";

export async function activateEnrollmentAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const locale = await getLocale();

  const enrollmentId = formData.get("enrollmentId") as string;

  if (!enrollmentId) {
    redirect(`/${locale}/admin/enrollments?error=Enrollment ID is required`);
    return;
  }

  try {
    // Verify enrollment exists and is pending
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        id: enrollmentId,
      },
      select: {
        status: true,
      },
    });

    if (!enrollment) {
      redirect(`/${locale}/admin/enrollments?error=Enrollment not found`);
      return;
    }

    if (enrollment.status === "Active") {
      redirect(`/${locale}/admin/enrollments?success=Enrollment is already active`);
      return;
    }

    // Update enrollment to Active
    await prisma.enrollment.update({
      where: {
        id: enrollmentId,
      },
      data: {
        status: "Active",
        updatedAt: new Date(),
      },
    });

    // Revalidate relevant paths
    revalidatePath(`/${locale}/admin/enrollments`);
    revalidatePath(`/${locale}/dashboard`);

    redirect(`/${locale}/admin/enrollments?success=Enrollment activated successfully`);
  } catch (error) {
    console.error("Error activating enrollment:", error);
    redirect(`/${locale}/admin/enrollments?error=Failed to activate enrollment`);
  }
}

