import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { BookOpen, Gamepad2, BarChart, Users } from "lucide-react";
import { useTranslations } from 'next-intl';

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const testimonials = [
  {
    name: "Bilal Ghoul",
    role: "Software Engineer",
    content: "This platform completely transformed my career. The courses are up-to-date and the community is incredibly supportive.",
    avatar: "BG"
  },
  {
    name: "Mohamed Naim",
    role: "Data Scientist",
    content: "The interactive learning approach helped me grasp complex concepts much faster than traditional methods.",
    avatar: "MN"
  },
  {
    name: "Salim Mansouria",
    role: "Product Designer",
    content: "I love the progress tracking features. Seeing my growth motivates me to keep learning every day.",
    avatar: "SM"
  }
];

export default function Home() {
  const t = useTranslations();
  
  const features: FeatureProps[] = [
    {
      title: t('Features.comprehensive.title'),
      description: t('Features.comprehensive.description'),
      icon: <BookOpen className="h-10 w-10 text-primary" />,
    },
    {
      title: t('Features.interactive.title'),
      description: t('Features.interactive.description'),
      icon: <Gamepad2 className="h-10 w-10 text-primary" />,
    },
    {
      title: t('Features.progress.title'),
      description: t('Features.progress.description'),
      icon: <BarChart className="h-10 w-10 text-primary" />,
    },
    {
      title: t('Features.community.title'),
      description: t('Features.community.description'),
      icon: <Users className="h-10 w-10 text-primary" />,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
       <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        </div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
        
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <Badge variant="secondary" className="px-4 py-2 text-sm">{t('Hero.badge')}</Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            {t('Hero.title')}
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl leading-relaxed">
            {t('Hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link className={buttonVariants({ size: "lg", className: "h-12 px-8 text-base" })} href="/courses">
              {t('Hero.explore')}
            </Link>
            <Link
              className={buttonVariants({ size: "lg", variant: "outline", className: "h-12 px-8 text-base" })}
              href="/login"
            >
              {t('Hero.signIn')}
            </Link>
          </div>
          
          <div className="pt-8 flex items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="font-bold text-foreground">1k+</span> {t('Hero.students')}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-foreground">50+</span> {t('Hero.courses')}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-foreground">24/7</span> {t('Hero.support')}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">{t('Features.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('Features.description')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/10">
              <CardHeader>
                <div className="mb-4 p-3 bg-primary/5 w-fit rounded-lg">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">{t('Testimonials.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('Testimonials.description')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-background border-none shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">&ldquo;{testimonial.content}&rdquo;</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">{t('CTA.title')}</h2>
            <p className="text-primary-foreground/80 text-lg">
              {t('CTA.description')}
            </p>
            <Link 
              href="/courses" 
              className={buttonVariants({ size: "lg", variant: "secondary", className: "h-12 px-8 text-base font-semibold" })}
            >
              {t('CTA.button')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
