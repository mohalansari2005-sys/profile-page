// ---------------------------------------------------------------------------
//  Experience API – mock implementation
// ---------------------------------------------------------------------------

export interface Experience {
    id: string;
    role: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string | null; // null = present
    description: string;
    technologies: string[];
}

/** Simulated network delay (ms). */
const FAKE_LATENCY = 350;

const MOCK_EXPERIENCES: Experience[] = [
    {
        id: "exp-1",
        role: "Product Engineering Intern",
        company: "Elm (Saudi Digital Government)",
        location: "Riyadh, Saudi Arabia",
        startDate: "2025-06",
        endDate: null,
        description:
            "Building internal AI-powered tools and backend micro-services. Designed asynchronous data pipelines for document processing and integrated LLM-based summarization into existing workflows.",
        technologies: ["Python", "FastAPI", "LangChain", "PostgreSQL", "Redis"],
    },
    {
        id: "exp-2",
        role: "Freelance Backend Developer",
        company: "Self-Employed",
        location: "Remote",
        startDate: "2024-09",
        endDate: "2025-05",
        description:
            "Delivered REST API backends for three client projects, including a hotel booking system with Amadeus integration, payment processing, and automated email notifications via Mailgun.",
        technologies: ["Python", "FastAPI", "Celery", "Docker", "SQLAlchemy"],
    },
    {
        id: "exp-3",
        role: "IT Support Technician",
        company: "University of Bahrain",
        location: "Sakheer, Bahrain",
        startDate: "2023-09",
        endDate: "2024-06",
        description:
            "Provided L1/L2 technical support across campus, maintained lab workstations, and automated recurring provisioning tasks with PowerShell scripts.",
        technologies: ["Windows Server", "Active Directory", "PowerShell"],
    },
];

export async function getExperiences(): Promise<Experience[]> {
    await new Promise((resolve) => setTimeout(resolve, FAKE_LATENCY));
    return MOCK_EXPERIENCES;
}
