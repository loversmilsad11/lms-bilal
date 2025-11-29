"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function activateEnrollmentAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const enrollmentId = formData.get("enrollmentId") as string;

  if (!enrollmentId) {
    redirect("/admin/enrollments?error=Enrollment ID is required");
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
      redirect("/admin/enrollments?error=Enrollment not found");
      return;
    }

    if (enrollment.status === "Active") {
      redirect("/admin/enrollments?success=Enrollment is already active");
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
    revalidatePath("/admin/enrollments");
    revalidatePath("/dashboard");

    redirect("/admin/enrollments?success=Enrollment activated successfully");
  } catch (error) {
    console.error("Error activating enrollment:", error);
    redirect("/admin/enrollments?error=Failed to activate enrollment");
  }
}

