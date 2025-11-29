"use server"

import { requireUser } from "@/app/data/user/require-user";
import arcjet, { fixedWindow } from "@/lib/arcjet";

import { prisma } from "@/lib/db";

import { ApiResponse } from "@/lib/types";
import { request } from "@arcjet/next";

const aj = arcjet.withRule(
    fixedWindow({
        mode: 'LIVE',
        window: "1m",
        max: 5,
    })
)


export async function enrollInCourseAction(courseId: string): Promise<ApiResponse | never> {

    const user = await requireUser()



    try {
        const req = await request()
        const decision = await aj.protect(req, {
            fingerprint: user.id

        })
        if (decision.isDenied()) {
            return {
                status: "error",
                message: "Yoo have been blocked"
            }
        }
        const course = await prisma.course.findUnique({
            where: {
                id: courseId
            },
            select: {
                id: true,
                title: true,
                price: true,
                slug: true,
            }
        })

        if (!course) {
            return {
                status: "error",
                message: "Course not found"
            }
        }

        // Check if user is already enrolled
        const existingEnrollment = await prisma.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId: user.id,
                    courseId: courseId
                }
            },
            select: {
                id: true,
                status: true,
            }
        })

        if (existingEnrollment?.status === "Active") {
            return {
                status: "success",
                message: "You are already enrolled in this course"
            }
        }

        // Create or update enrollment with Pending status (Cash on Delivery)
        let enrollment;

        if (existingEnrollment) {
            enrollment = await prisma.enrollment.update({
                where: {
                    id: existingEnrollment.id,
                },
                data: {
                    amount: course.price * 100,
                    status: "Pending",
                    updatedAt: new Date()
                }
            })
        } else {
            enrollment = await prisma.enrollment.create({
                data: {
                    userId: user.id,
                    courseId: course.id,
                    amount: course.price * 100,
                    status: "Pending"
                }
            })
        }

        return {
            status: "success",
            message: "Your order has been created successfully. We will contact you via WhatsApp to confirm the order",
            enrollmentId: enrollment.id,
        };

    }

    catch (error) {
        console.error("Error in enrollInCourseAction:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return {
            status: "error",
            message: errorMessage || "Failed to enroll in course"
        }
    }
}