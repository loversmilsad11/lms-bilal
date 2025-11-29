"use server";

import { prisma } from "@/lib/db";

export async function getInstructors() {
    try {
        // Get users who have created courses (instructors)
        const instructors = await prisma.user.findMany({
            where: {
                courses: {
                    some: {
                        status: "Published"
                    }
                }
            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                _count: {
                    select: {
                        courses: {
                            where: {
                                status: "Published"
                            }
                        }
                    }
                },
                courses: {
                    where: {
                        status: "Published"
                    },
                    select: {
                        _count: {
                            select: {
                                enrollment: {
                                    where: {
                                        status: "Active"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        // Transform data to include total students
        const instructorsWithStats = instructors.map(instructor => {
            const totalStudents = instructor.courses.reduce(
                (sum, course) => sum + course._count.enrollment,
                0
            );

            return {
                id: instructor.id,
                name: instructor.name,
                email: instructor.email,
                image: instructor.image,
                coursesCount: instructor._count.courses,
                studentsCount: totalStudents,
                // Calculate average rating (placeholder - you can add a rating system later)
                rating: 4.8
            };
        });

        return instructorsWithStats;
    } catch (error) {
        console.error("Error fetching instructors:", error);
        return [];
    }
}

export async function getInstructorStats() {
    try {
        const [totalInstructors, totalStudents, totalCourses] = await Promise.all([
            // Count users with published courses
            prisma.user.count({
                where: {
                    courses: {
                        some: {
                            status: "Published"
                        }
                    }
                }
            }),
            // Count total active enrollments
            prisma.enrollment.count({
                where: {
                    status: "Active"
                }
            }),
            // Count published courses
            prisma.course.count({
                where: {
                    status: "Published"
                }
            })
        ]);

        return {
            instructors: totalInstructors,
            students: totalStudents,
            courses: totalCourses,
            rating: 4.8
        };
    } catch (error) {
        console.error("Error fetching instructor stats:", error);
        return {
            instructors: 0,
            students: 0,
            courses: 0,
            rating: 0
        };
    }
}
