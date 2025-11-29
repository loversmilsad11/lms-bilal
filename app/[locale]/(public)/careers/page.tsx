import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Briefcase, Heart, Zap, Coffee, ArrowRight, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { useTranslations } from 'next-intl';

const positions = [
  {
    title: "Senior Full Stack Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "We are looking for an experienced engineer to help build the next generation of our learning platform.",
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Join our design team to create intuitive and beautiful user experiences for our students.",
  },
  {
    title: "Content Strategist",
    department: "Marketing",
    location: "London, UK",
    type: "Full-time",
    description: "Help us tell our story and reach more learners through compelling content strategies.",
  },
   {
    title: "Student Success Manager",
    department: "Support",
    location: "Remote",
    type: "Full-time",
    description: "Be the face of our platform and help students achieve their learning goals.",
  },
];

export default function CareersPage() {
  const t = useTranslations('Careers');
  
  const benefits = [
    {
      title: t('benefits.health.title'),
      description: t('benefits.health.description'),
      icon: <Heart className="h-6 w-6 text-primary" />,
    },
    {
      title: t('benefits.remote.title'),
      description: t('benefits.remote.description'),
      icon: <Zap className="h-6 w-6 text-primary" />,
    },
    {
      title: t('benefits.learning.title'),
      description: t('benefits.learning.description'),
      icon: <Briefcase className="h-6 w-6 text-primary" />,
    },
    {
      title: t('benefits.events.title'),
      description: t('benefits.events.description'),
      icon: <Coffee className="h-6 w-6 text-primary" />,
    },
  ];
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
         <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        </div>
        <div className="absolute right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
        
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto px-4">
          <Badge variant="secondary" className="px-4 py-2 text-sm">{t('badge')}</Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            {t('title')}
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl leading-relaxed">
            {t('description')}
          </p>
          <Button size="lg" className="h-12 px-8 text-base" asChild>
            <Link href="#positions">{t('viewOpenings')}</Link>
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight mb-4">{t('whyWork.title')}</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    {t('whyWork.description')}
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => (
                    <Card key={index} className="bg-background border-none shadow-sm hover:shadow-md transition-all">
                        <CardHeader>
                            <div className="mb-4 p-3 bg-primary/10 w-fit rounded-lg">{benefit.icon}</div>
                            <CardTitle className="text-lg">{benefit.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm">{benefit.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="positions" className="py-20">
        <div className="container mx-auto">
             <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight mb-4">{t('positions.title')}</h2>
                    <p className="text-muted-foreground">
                        {t('positions.description')}
                    </p>
                </div>
                <Button variant="outline">{t('positions.viewAll')}</Button>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
                {positions.map((job, index) => (
                    <Card key={index} className="group hover:border-primary/50 transition-colors cursor-pointer">
                        <CardHeader>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{job.title}</CardTitle>
                                    <CardDescription className="mt-1">{job.department}</CardDescription>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        {job.location}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        {job.type}
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{job.description}</p>
                        </CardContent>
                        <CardFooter>
                            <div className="flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
                                {t('positions.apply')} <ArrowRight className="ml-1 h-4 w-4" />
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
      </section>
    </>
  );
}
