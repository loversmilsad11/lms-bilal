import { ReactNode } from "react";
import { CourseSidebar } from "../_components/CourseSidebar";
import { getCourseSidebarData } from "@/app/data/course/get-course.sidebar-data";

interface iAppProps {
  params: Promise<{ slug: string }>;
  children: ReactNode;
}

export default async function CourseLayout({ children, params }: iAppProps) {
  const { slug } = await params;

  const course = await getCourseSidebarData(slug);
  return (
    <div className="flex flex-1 flex-col md:flex-row">
      {/* sidebar - becomes full width on small screens, fixed width on md+ */}
      <div className="w-full md:w-80 md:shrink-0 border-b md:border-b-0 md:border-r border-border">
        <CourseSidebar course={course.course} />
      </div>
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
