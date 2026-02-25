import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Mail, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import me from "@/assets/me.jpg";

const highlights = [
    "Python",
    "SQL",
    "Backend Development (FastAPI, REST APIs)",
    "Data Validation & Structured Data Handling",
    "AI-Enabled Development (LangChain)",
    "Rapid Prototyping",
] as const;

/* ------------------------------------------------------------------ */
/*  Hero — visible immediately on page load (no scroll trigger)       */
/* ------------------------------------------------------------------ */

function HeroBlock() {
    return (
        <section className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex flex-col items-center gap-4"
            >
                <Avatar className="h-32 w-32 shrink-0 border-2 border-border shadow-md">
                    <AvatarImage src={me} alt="Mohammed Al-Ansari" />
                    <AvatarFallback>MA</AvatarFallback>
                </Avatar>

                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Mohammed Al-Ansari
                </h1>

                <p className="text-lg text-muted-foreground sm:text-xl">
                    Product Engineer — Building AI-Powered Systems
                </p>
            </motion.div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/*  About — bio paragraph, reveals on scroll                          */
/* ------------------------------------------------------------------ */

function AboutBlock() {
    return (
        <ScrollReveal className="flex flex-col items-center px-4 py-24 text-center">
            <Separator className="mb-8 w-24" />

            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
                Information Systems undergraduate with hands-on experience building
                backend systems, data pipelines, and AI-enabled applications.
                Skilled in Python-based backend development, API integrations,
                asynchronous processing, and database-driven systems. Experienced
                in rapid prototyping and translating business needs into technical
                solutions through structured requirement gathering and analysis.
                Demonstrates strong interest in data engineering and
                operationalizing AI solutions within real-world IT and product
                environments.
            </p>
        </ScrollReveal>
    );
}

/* ------------------------------------------------------------------ */
/*  Skills — badge list, reveals on scroll                            */
/* ------------------------------------------------------------------ */

function SkillsBlock() {
    return (
        <ScrollReveal className="flex flex-col items-center px-4 py-16 text-center">
            <div className="flex flex-wrap items-center justify-center gap-2">
                {highlights.map((label) => (
                    <Badge key={label} variant="secondary" className="text-sm">
                        {label}
                    </Badge>
                ))}
            </div>
        </ScrollReveal>
    );
}

/* ------------------------------------------------------------------ */
/*  Contact — social icon links, reveals on scroll                    */
/* ------------------------------------------------------------------ */

function ContactBlock() {
    return (
        <ScrollReveal className="flex flex-col items-center px-4 py-16 pb-32">
            <TooltipProvider delayDuration={300}>
                <div className="flex items-center justify-center gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" asChild>
                                <a
                                    href="https://wa.me/966558335942"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="WhatsApp"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                                    </svg>
                                </a>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>WhatsApp</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" asChild>
                                <a
                                    href="mailto:moh.alansari2005@gmail.com"
                                    aria-label="Email"
                                >
                                    <Mail className="h-5 w-5" />
                                </a>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Email</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" asChild>
                                <a
                                    href="https://www.linkedin.com/in/mohammed-m-al-ansari"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="h-5 w-5" />
                                </a>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>LinkedIn</TooltipContent>
                    </Tooltip>
                </div>
            </TooltipProvider>
        </ScrollReveal>
    );
}

/* ------------------------------------------------------------------ */
/*  Main About page                                                   */
/* ------------------------------------------------------------------ */

function About() {
    return (
        <div className="flex flex-col">
            <HeroBlock />
            <AboutBlock />
            <SkillsBlock />
            <ContactBlock />
        </div>
    );
}

export default About;
