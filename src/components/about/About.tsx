import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";

const highlights = ["React", "TypeScript", "Cloud", "Open Source"] as const;

function About() {
    return (
        <section className="flex min-h-screen items-center justify-center px-4 py-16 md:py-24">
            <Card className="w-full max-w-2xl border shadow-sm">
                <CardHeader className="items-center text-center">
                    {/* Name */}
                    <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                        Mohammed Al-Ansari
                    </h1>

                    {/* Headline */}
                    <p className="mt-2 text-lg text-muted-foreground sm:text-xl">
                        Product Engineer — Building AI-Powered Systems
                    </p>
                </CardHeader>

                <CardContent className="flex flex-col items-center text-center">
                    <Separator className="mb-8 w-24" />

                    {/* Bio */}
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

                    {/* Highlight Badges */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                        {highlights.map((label) => (
                            <Badge key={label} variant="secondary" className="text-sm">
                                {label}
                            </Badge>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Button size="lg" asChild>
                            <a href="mailto:hello@example.com">Get in Touch</a>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <a href="#resume" target="_blank" rel="noopener noreferrer">
                                View Resume
                            </a>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}

export default About;
