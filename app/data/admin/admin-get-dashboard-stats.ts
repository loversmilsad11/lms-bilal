import "server-only"
import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";


export async function adminGetDashboardStats() {
    await requireAdmin();

    const [totalUsers, totalCourses, totalLessons, totalenrollment] = await Promise.all([
        // total signups
        prisma.user.count(),
        // total course
        prisma.course.count(),
        // total lessens
        prisma.lesson.count(),
        //
        prisma.enrollment.count()
    ])

    return {
        totalUsers,
        totalCourses,
        totalLessons,
        totalenrollment
    }

}