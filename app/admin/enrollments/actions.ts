"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function activateEnrollmentAction(formData: FormData) {
  await requireAdmin();

  const enrollmentId = formData.get("enrollmentId") as string;

  if (!enrollmentId) {
    return {
      status: "error",
      message: "Enrollment ID is required",
    };
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
      return {
        status: "error",
        message: "Enrollment not found",
      };
    }

    if (enrollment.status === "Active") {
      return {
        status: "success",
        message: "Enrollment is already active",
      };
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

    redirect("/admin/enrollments?success=true");
  } catch (error) {
    console.error("Error activating enrollment:", error);
    return {
      status: "error",
      message: "Failed to activate enrollment",
    };
  }
}

