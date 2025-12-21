import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Gamepad2, BarChart, Users } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';
import { FloatingStars } from "@/components/ui/floating-stars";
import { Starfield } from "@/components/ui/starfield";

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
  const locale = useLocale();

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
    <div className="relative w-full overflow-hidden">
      <Starfield />
      <FloatingStars />
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        </div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px] animate-pulse"></div>
        <div className="absolute right-10 bottom-10 -z-10 h-[200px] w-[200px] rounded-full bg-secondary/20 opacity-20 blur-[80px] animate-pulse delay-700"></div>

        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            <Badge variant="secondary" className="px-4 py-2 text-sm animate-bounce duration-1000">{t('Hero.badge')}</Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-foreground/70 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              {t('Hero.title')}
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
              {t('Hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              <Link className={buttonVariants({ size: "lg", className: "h-12 px-8 text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95" })} href={`/${locale}/courses`}>
                {t('Hero.explore')}
              </Link>
              <Link
                className={buttonVariants({ size: "lg", variant: "outline", className: "h-12 px-8 text-base hover:bg-accent transition-all active:scale-95" })}
                href={`/${locale}/login`}
              >
                {t('Hero.signIn')}
              </Link>
            </div>

            <div className="pt-8 flex flex-wrap justify-center lg:justify-start items-center gap-8 text-sm text-muted-foreground animate-in fade-in duration-1000 delay-500">
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground text-lg">1k+</span> {t('Hero.students')}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground text-lg">50+</span> {t('Hero.courses')}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground text-lg">24/7</span> {t('Hero.support')}
              </div>
            </div>
          </div>

          <div className="relative w-full aspect-square max-w-[600px] mx-auto lg:order-last">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full filter blur-[100px] -z-10 animate-pulse"></div>
            <Image
              src="/hero-illustration.png"
              alt="Global Learning"
              fill
              className="object-contain drop-shadow-2xl animate-in fade-in zoom-in-50 duration-1000 delay-200"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t('Features.title')}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t('Features.description')}
              </p>
            </div>
            <div className="relative h-[300px] w-full rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-border/50">
              <Image
                src="/features-illustration.png"
                alt="Features Visualization"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-primary/10 group">
                <CardHeader>
                  <div className="mb-4 p-3 bg-primary/5 w-fit rounded-lg group-hover:bg-primary/10 transition-colors duration-300">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 overflow-hidden relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -left-[10%] top-[20%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]"></div>
          <div className="absolute -right-[10%] bottom-[20%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative h-[400px] w-full lg:order-last">
              <Image
                src="/community-illustration.png"
                alt="Community Visualization"
                fill
                className="object-contain animate-in fade-in slide-in-from-right duration-1000"
              />
            </div>
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight mb-4">{t('Testimonials.title')}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {t('Testimonials.description')}
              </p>
              <div className="flex gap-2 justify-center lg:justify-start">
                {/* Placeholder for avatars or trust indicators could go here */}
              </div>
            </div>
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
        <div className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>

          <div className="grid lg:grid-cols-2 gap-8 items-center relative z-10">
            <div className="space-y-8 text-center lg:text-left">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">{t('CTA.title')}</h2>
              <p className="text-primary-foreground/90 text-lg md:text-xl max-w-xl">
                {t('CTA.description')}
              </p>
              <Link
                href={`/${locale}/courses`}
                className={buttonVariants({ size: "lg", variant: "secondary", className: "h-14 px-10 text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95" })}
              >
                {t('CTA.button')}
              </Link>
            </div>

            <div className="relative h-[300px] md:h-[400px] w-full flex justify-center items-center">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-[80px] scale-75 animate-pulse"></div>
              <Image
                src="/cta-illustration.png"
                alt="Start Your Journey"
                fill
                className="object-contain drop-shadow-2xl hover:rotate-1 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
