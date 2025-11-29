"use server"

import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function verifyAndActivateEnrollment(enrollmentId: string) {
    try {
        const user = await requireUser();

        // Verify enrollment belongs to user
        const enrollment = await prisma.enrollment.findUnique({
            where: {
                id: enrollmentId,
            },
            select: {
                userId: true,
                status: true,
            }
        });

        if (!enrollment) {
            return {
                status: "error",
                message: "Enrollment not found"
            };
        }

        if (enrollment.userId !== user.id) {
            return {
                status: "error",
                message: "Unauthorized"
            };
        }

        // If already active, return success
        if (enrollment.status === "Active") {
            return {
                status: "success",
                message: "Enrollment already active"
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

        // Revalidate dashboard to show updated courses
        revalidatePath("/dashboard");

        return {
            status: "success",
            message: "Enrollment activated successfully"
        };
    } catch (error) {
        console.error("Error verifying enrollment:", error);
        return {
            status: "error",
            message: "Failed to verify enrollment"
        };
    }
}

