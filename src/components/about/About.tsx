import { type ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Mail, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import {
    ScrollReveal,
    StaggerReveal,
    StaggerItem,
} from "@/components/motion/ScrollReveal";
import { useProfile } from "@/hooks/useProfile";
import type { Profile, SocialLink } from "@/lib/api/profile";

const appleEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ------------------------------------------------------------------ */
/*  WhatsApp SVG icon (no lucide equivalent)                          */
/* ------------------------------------------------------------------ */

function WhatsAppIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
    );
}

/* ------------------------------------------------------------------ */
/*  Icon resolver — maps platform string to icon element              */
/* ------------------------------------------------------------------ */

const SOCIAL_ICONS: Record<SocialLink["platform"], ReactNode> = {
    whatsapp: <WhatsAppIcon />,
    email: <Mail className="h-5 w-5" />,
    linkedin: <Linkedin className="h-5 w-5" />,
};

function isExternal(url: string): boolean {
    return url.startsWith("http") || url.startsWith("https");
}

/* ------------------------------------------------------------------ */
/*  Skeleton layouts (shown while loading)                            */
/* ------------------------------------------------------------------ */

function HeroSkeleton() {
    return (
        <section className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
            <div className="flex flex-col items-center gap-4">
                <Skeleton className="h-32 w-32 rounded-full" />
                <Skeleton className="h-10 w-72 sm:w-96" />
                <Skeleton className="h-6 w-56 sm:w-80" />
            </div>
        </section>
    );
}

function AboutSkeleton() {
    return (
        <div className="flex flex-col items-center px-4 py-24 text-center">
            <Skeleton className="mb-8 h-px w-24" />
            <div className="max-w-xl space-y-3 rounded-2xl px-8 py-10">
                <Skeleton className="mx-auto h-4 w-full" />
                <Skeleton className="mx-auto h-4 w-5/6" />
                <Skeleton className="mx-auto h-4 w-4/6" />
                <Skeleton className="mx-auto h-4 w-full" />
                <Skeleton className="mx-auto h-4 w-3/4" />
            </div>
        </div>
    );
}

function SkillsSkeleton() {
    return (
        <div className="flex flex-col items-center px-4 py-16 text-center">
            <div className="flex flex-wrap items-center justify-center gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-7 w-24 rounded-full" />
                ))}
            </div>
        </div>
    );
}

function ContactSkeleton() {
    return (
        <div className="flex flex-col items-center px-4 py-16 pb-32">
            <div className="flex items-center justify-center gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-10 rounded-md" />
                ))}
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Error fallback                                                    */
/* ------------------------------------------------------------------ */

function ErrorFallback() {
    return (
        <section className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
            <p className="text-lg text-muted-foreground">
                Something went wrong loading the profile.
            </p>
            <p className="mt-2 text-sm text-muted-foreground/60">
                Please try refreshing the page.
            </p>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/*  Hero — visible immediately on page load                           */
/* ------------------------------------------------------------------ */

function HeroBlock({ profile }: { profile: Profile }) {
    return (
        <section className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 1,
                    ease: appleEase,
                    opacity: { duration: 0.8 },
                    scale: { duration: 1.2, ease: appleEase },
                }}
                className="flex flex-col items-center gap-4"
            >
                {/* Avatar with accent ring */}
                <Avatar className="h-32 w-32 shrink-0 shadow-lg ring-2 ring-indigo-500/20 ring-offset-2 ring-offset-background">
                    <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                    <AvatarFallback>{profile.initials}</AvatarFallback>
                </Avatar>

                {/* Name — accent gradient text */}
                <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7, ease: appleEase }}
                    className="bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl"
                >
                    {profile.name}
                </motion.h1>

                {/* Headline — slightly lighter */}
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.7, ease: appleEase }}
                    className="text-lg font-medium text-muted-foreground/80 sm:text-xl"
                >
                    {profile.headline}
                </motion.p>
            </motion.div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/*  About — bio paragraph, reveals on scroll (glass card)             */
/* ------------------------------------------------------------------ */

function AboutBlock({ bio }: { bio: string }) {
    return (
        <ScrollReveal
            className="flex flex-col items-center px-4 py-24 text-center"
            transition={{ duration: 0.8, ease: appleEase }}
        >
            <Separator className="mb-8 w-24 bg-indigo-500/20" />

            <div className="glass-card max-w-xl rounded-2xl px-8 py-10">
                <p className="text-base leading-relaxed text-muted-foreground">
                    {bio}
                </p>
            </div>
        </ScrollReveal>
    );
}

/* ------------------------------------------------------------------ */
/*  Skills — badges with staggered reveal                             */
/* ------------------------------------------------------------------ */

function SkillsBlock({ skills }: { skills: string[] }) {
    return (
        <StaggerReveal
            className="flex flex-col items-center px-4 py-16 text-center"
            delayChildren={0.15}
            staggerChildren={0.09}
        >
            <div className="flex flex-wrap items-center justify-center gap-2">
                {skills.map((label) => (
                    <StaggerItem key={label}>
                        <Badge
                            variant="secondary"
                            className="border border-indigo-500/10 bg-indigo-500/5 text-sm text-foreground/80 backdrop-blur-sm"
                        >
                            {label}
                        </Badge>
                    </StaggerItem>
                ))}
            </div>
        </StaggerReveal>
    );
}

/* ------------------------------------------------------------------ */
/*  Contact — social icons with staggered fade-in                     */
/* ------------------------------------------------------------------ */

function ContactBlock({ socials }: { socials: SocialLink[] }) {
    return (
        <StaggerReveal
            className="flex flex-col items-center px-4 py-16 pb-32"
            delayChildren={0.1}
            staggerChildren={0.12}
        >
            <TooltipProvider delayDuration={300}>
                <div className="flex items-center justify-center gap-2">
                    {socials.map((social) => (
                        <StaggerItem key={social.platform} offsetY={16}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        asChild
                                        className="transition-colors hover:text-indigo-500"
                                    >
                                        <a
                                            href={social.url}
                                            target={isExternal(social.url) ? "_blank" : undefined}
                                            rel={isExternal(social.url) ? "noopener noreferrer" : undefined}
                                            aria-label={social.label}
                                        >
                                            {SOCIAL_ICONS[social.platform]}
                                        </a>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>{social.label}</TooltipContent>
                            </Tooltip>
                        </StaggerItem>
                    ))}
                </div>
            </TooltipProvider>
        </StaggerReveal>
    );
}

/* ------------------------------------------------------------------ */
/*  Main About page                                                   */
/* ------------------------------------------------------------------ */

function About() {
    const { data: profile, isLoading, isError } = useProfile();

    if (isError) return <ErrorFallback />;

    if (isLoading || !profile) {
        return (
            <div className="flex flex-col">
                <HeroSkeleton />
                <AboutSkeleton />
                <SkillsSkeleton />
                <ContactSkeleton />
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            <HeroBlock profile={profile} />
            <AboutBlock bio={profile.bio} />
            <SkillsBlock skills={profile.skills} />
            <ContactBlock socials={profile.socials} />
        </div>
    );
}

export default About;
