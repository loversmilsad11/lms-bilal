import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Globe, Award } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('About');
  
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

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-background border-primary/10 shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                    <Target className="h-10 w-10 text-primary mb-4" />
                    <CardTitle>{t('mission.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{t('mission.description')}</p>
                </CardContent>
            </Card>
            <Card className="bg-background border-primary/10 shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                    <Globe className="h-10 w-10 text-primary mb-4" />
                    <CardTitle>{t('vision.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{t('vision.description')}</p>
                </CardContent>
            </Card>
            <Card className="bg-background border-primary/10 shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                    <Award className="h-10 w-10 text-primary mb-4" />
                    <CardTitle>{t('values.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{t('values.description')}</p>
                </CardContent>
            </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div className="space-y-2">
                    <h3 className="text-4xl font-bold text-primary">10k+</h3>
                    <p className="text-muted-foreground">{t('stats.students')}</p>
                </div>
                <div className="space-y-2">
                    <h3 className="text-4xl font-bold text-primary">200+</h3>
                    <p className="text-muted-foreground">{t('stats.instructors')}</p>
                </div>
                <div className="space-y-2">
                    <h3 className="text-4xl font-bold text-primary">500+</h3>
                    <p className="text-muted-foreground">{t('stats.courses')}</p>
                </div>
                <div className="space-y-2">
                    <h3 className="text-4xl font-bold text-primary">4.9</h3>
                    <p className="text-muted-foreground">{t('stats.rating')}</p>
                </div>
            </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">{t('team.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('team.description')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
                { name: "Bilal Ghoul", role: "Founder & CEO", initials: "BG" },
                { name: "Sarah Smith", role: "Head of Education", initials: "SS" },
                { name: "John Doe", role: "Lead Developer", initials: "JD" }
             ].map((member, i) => (
                <div key={i} className="flex flex-col items-center p-6 bg-background rounded-xl border border-border/50 hover:border-primary/20 transition-colors">
                    <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mb-4">
                        {member.initials}
                    </div>
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-muted-foreground">{member.role}</p>
                </div>
             ))}
        </div>
      </section>
    </>
  );
}
