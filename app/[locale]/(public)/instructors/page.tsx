import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, BookOpen, Users } from "lucide-react";
import { getTranslations } from 'next-intl/server';
import { getInstructors, getInstructorStats } from "@/app/data/instructors/get-instructors";
import Image from "next/image";

export default async function InstructorsPage() {
  const t = await getTranslations('Instructors');
  
  // Fetch data from database
  const [instructors, stats] = await Promise.all([
    getInstructors(),
    getInstructorStats()
  ]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
         <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        </div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
        
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <Badge variant="secondary" className="px-4 py-2 text-sm">{t('badge')}</Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            {t('title')}
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl leading-relaxed">
            {t('description')}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div className="space-y-2">
                    <h3 className="text-4xl font-bold text-primary">{stats.instructors}+</h3>
                    <p className="text-muted-foreground">{t('stats.instructors')}</p>
                </div>
                <div className="space-y-2">
                    <h3 className="text-4xl font-bold text-primary">{stats.students.toLocaleString()}+</h3>
                    <p className="text-muted-foreground">{t('stats.students')}</p>
                </div>
                <div className="space-y-2">
                    <h3 className="text-4xl font-bold text-primary">{stats.courses}+</h3>
                    <p className="text-muted-foreground">{t('stats.courses')}</p>
                </div>
                <div className="space-y-2">
                    <h3 className="text-4xl font-bold text-primary">{stats.rating}</h3>
                    <p className="text-muted-foreground">{t('stats.rating')}</p>
                </div>
            </div>
        </div>
      </section>

      {/* Instructors Grid */}
      <section className="py-12">
        {instructors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No instructors found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instructors.map((instructor) => {
              // Get initials from name
              const initials = instructor.name
                .split(' ')
                .map(n => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);

              return (
                <Card key={instructor.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      {instructor.image ? (
                        <Image
                          src={instructor.image}
                          alt={instructor.name}
                          width={64}
                          height={64}
                          className="h-16 w-16 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                          {initials}
                        </div>
                      )}
                      <div className="flex-1">
                        <CardTitle className="text-lg">{instructor.name}</CardTitle>
                        <CardDescription className="text-sm">{instructor.email}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{instructor.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{instructor.studentsCount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{instructor.coursesCount}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="default" className="flex-1" size="sm">
                        {t('viewProfile')}
                      </Button>
                      <Button variant="outline" className="flex-1" size="sm">
                        {t('viewCourses')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
