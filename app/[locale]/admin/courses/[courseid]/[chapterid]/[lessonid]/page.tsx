import adminGetLesson from "@/app/data/admin/admin-get-lesson";
import { LessonForm } from "./_components/LessonForm";
import { requireAdmin } from "@/app/data/admin/require-admin";

type Params = Promise<{
  chapterid: string;
  courseid: string;
  lessonid: string;
}>;

export default async function LessonIdPage({ params }: { params: Params }) {
  await requireAdmin();
  const { chapterid, courseid, lessonid } = await params;
  const lesson = await adminGetLesson(lessonid);

  return <LessonForm data={lesson} chapterid={chapterid} courseid={courseid} />;
}
