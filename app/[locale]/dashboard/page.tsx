import { EmptyState } from "@/components/general/EmptyState";
import { getAllCourses } from "../../data/course/get-all-courses";
import { getEnrolledCourses } from "../../data/user/get-enrolled-courses";
import { PublicCourseCard } from "../(public)/_components/PublicCourseCard";
import { CourseProgressCard } from "./_components/CourseProgressCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Check if user is admin and redirect to admin panel
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user.role === "admin") {
    redirect(`/${locale}/admin`);
  }

  // If no session, redirect to login
  if (!session) {
    redirect(`/${locale}/login`);
  }

  let courses = [] as Awaited<ReturnType<typeof getAllCourses>>;
  let enrolledCourses = [] as Awaited<ReturnType<typeof getEnrolledCourses>>;

  try {
    [courses, enrolledCourses] = await Promise.all([
      getAllCourses(),
      getEnrolledCourses(),
    ]);
  } catch (err) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold text-red-600">
          Error loading dashboard
        </h2>
        <pre className="mt-4 whitespace-pre-wrap text-sm text-muted-foreground">
          {String(err)}
        </pre>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Enrolled Courses</h1>
        <p className="text-muted-foreground">
          Here you can see all the courses you have access to
        </p>
      </div>

      {enrolledCourses.length === 0 ? (
        <EmptyState
          title="No courses purchased"
          description="You have not purchased any courses yet. Browse available courses and start learning!"
          buttonText="Browse Courses"
          Href="/courses"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrolledCourses.map((course) => (
            <CourseProgressCard key={course.Course.id} data={course} />
          ))}
        </div>
      )}

      <section className="mt-10">
        <div className="flex flex-col gap-2 mb-5">
          <h1 className="text-3xl font-bold">Available Courses</h1>
          <p className="text-muted-foreground">
            Here you can see all the courses you can purchase
          </p>
        </div>

        {courses.filter(
          (course) =>
            !enrolledCourses.some(
              ({ Course: enrolled }) => enrolled.id === course.id
            )
        ).length === 0 ? (
          <EmptyState
            title="No courses available"
            description="You have purchased all available courses!"
            buttonText="Browse Courses"
            Href="/courses"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses
              .filter(
                (course) =>
                  !enrolledCourses.some(
                    ({ Course: enrolled }) => enrolled.id === course.id
                  )
              )
              .map((course) => (
                <PublicCourseCard key={course.id} data={course} />
              ))}
          </div>
        )}
      </section>
    </>
  );
}
