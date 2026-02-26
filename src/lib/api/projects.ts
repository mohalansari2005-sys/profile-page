// ---------------------------------------------------------------------------
//  Projects API – mock implementation
// ---------------------------------------------------------------------------

export interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    repoUrl: string | null;
    liveUrl: string | null;
    featured: boolean;
}

/** Simulated network delay (ms). */
const FAKE_LATENCY = 300;

const MOCK_PROJECTS: Project[] = [
    {
        id: "proj-1",
        title: "Hotel Booking Backend",
        description:
            "End-to-end hotel booking API with Amadeus integration, cart workflows, idempotent payments, and automated email confirmations via Celery + Mailgun.",
        technologies: ["Python", "FastAPI", "Celery", "PostgreSQL", "Mailgun"],
        repoUrl: "https://github.com/mohalansari2005-sys/hotel-booking",
        liveUrl: null,
        featured: true,
    },
    {
        id: "proj-2",
        title: "AI Document Summarizer",
        description:
            "LangChain-powered pipeline that ingests PDF documents, chunks them with recursive splitting, and produces structured summaries via GPT-4.",
        technologies: ["Python", "LangChain", "OpenAI", "FastAPI"],
        repoUrl: "https://github.com/mohalansari2005-sys/ai-summarizer",
        liveUrl: null,
        featured: true,
    },
    {
        id: "proj-3",
        title: "Portfolio Website",
        description:
            "This site! A Vite + React + TypeScript portfolio with scroll-reveal animations, TanStack Query data layer, and shadcn/ui components.",
        technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
        repoUrl: "https://github.com/mohalansari2005-sys/profile-page",
        liveUrl: null,
        featured: false,
    },
];

export async function getProjects(): Promise<Project[]> {
    await new Promise((resolve) => setTimeout(resolve, FAKE_LATENCY));
    return MOCK_PROJECTS;
}
