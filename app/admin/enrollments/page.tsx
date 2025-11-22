import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { activateEnrollmentAction } from "./actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock } from "lucide-react";

async function getPendingEnrollments() {
  await requireAdmin();

  const enrollments = await prisma.enrollment.findMany({
    where: {
      status: "Pending",
    },
    include: {
      User: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      Course: {
        select: {
          id: true,
          title: true,
          price: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return enrollments;
}

export default async function EnrollmentsPage() {
  const enrollments = await getPendingEnrollments();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Enrollment Management</h1>
        <p className="text-muted-foreground">
          Review pending enrollments and activate them after confirming payment
        </p>
      </div>

      {enrollments.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground">No pending enrollments</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {enrollments.map((enrollment) => (
            <Card key={enrollment.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{enrollment.Course.title}</CardTitle>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="size-3" />
                    Pending
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">User:</p>
                    <p className="font-medium">{enrollment.User.name}</p>
                    <p className="text-xs text-muted-foreground">{enrollment.User.email}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Price:</p>
                    <p className="font-medium">{enrollment.amount / 100} DZD</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Order Date:</p>
                    <p className="font-medium">
                      {new Date(enrollment.createdAt).toLocaleDateString("en-US")}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Order ID:</p>
                    <p className="font-mono text-xs">{enrollment.id}</p>
                  </div>
                </div>
                <form action={activateEnrollmentAction}>
                  <input type="hidden" name="enrollmentId" value={enrollment.id} />
                  <Button type="submit" className="w-full">
                    <CheckCircle2 className="size-4 mr-2" />
                    Confirm Payment & Activate Course
                  </Button>
                </form>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

