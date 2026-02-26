// ---------------------------------------------------------------------------
//  Profile API – mock implementation
// ---------------------------------------------------------------------------

export interface SocialLink {
    platform: "whatsapp" | "email" | "linkedin";
    url: string;
    label: string;
}

export interface Profile {
    name: string;
    initials: string;
    headline: string;
    avatarUrl: string;
    bio: string;
    skills: string[];
    socials: SocialLink[];
}

/** Simulated network delay (ms). */
const FAKE_LATENCY = 400;

const MOCK_PROFILE: Profile = {
    name: "Mohammed Al-Ansari",
    initials: "MA",
    headline: "Product Engineer — Building AI-Powered Systems",
    avatarUrl: "/me.jpg",
    bio: "Information Systems undergraduate with hands-on experience building backend systems, data pipelines, and AI-enabled applications. Skilled in Python-based backend development, API integrations, asynchronous processing, and database-driven systems. Experienced in rapid prototyping and translating business needs into technical solutions through structured requirement gathering and analysis. Demonstrates strong interest in data engineering and operationalizing AI solutions within real-world IT and product environments.",
    skills: [
        "Python",
        "SQL",
        "Backend Development (FastAPI, REST APIs)",
        "Data Validation & Structured Data Handling",
        "AI-Enabled Development (LangChain)",
        "Rapid Prototyping",
    ],
    socials: [
        {
            platform: "whatsapp",
            url: "https://wa.me/966558335942",
            label: "WhatsApp",
        },
        {
            platform: "email",
            url: "mailto:moh.alansari2005@gmail.com",
            label: "Email",
        },
        {
            platform: "linkedin",
            url: "https://www.linkedin.com/in/mohammed-m-al-ansari",
            label: "LinkedIn",
        },
    ],
};

export async function getProfile(): Promise<Profile> {
    await new Promise((resolve) => setTimeout(resolve, FAKE_LATENCY));
    return MOCK_PROFILE;
}
