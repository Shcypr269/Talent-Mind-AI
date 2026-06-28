export type Candidate = {
  id: string;
  name: string;
  title: string;
  company: string;
  experience: number;
  location: string;
  industry: string;
  skills: string[];
  fitScore: number;
  behaviorScore: number;
  growthScore: number;
  activityScore: number;
  leadership: number;
  ownership: number;
  communication: number;
  initiative: number;
  collaboration: number;
  learning: number;
  consistency: number;
  aiSummary: string;
  strengths: string[];
  concerns: string[];
  missingSkills: string[];
  recruiterNotes: string;
  confidence: number;
  career: { role: string; period: string; current?: boolean }[];
  promotionVelocity: number;
  growthPotential: number;
  careerMomentum: number;
};

export const candidates: Candidate[] = [
  {
    id: "1",
    name: "Aarav Sharma",
    title: "Senior Backend Engineer",
    company: "Stripe",
    experience: 8,
    location: "Bengaluru, IN",
    industry: "Fintech",
    skills: ["Go", "Kubernetes", "Distributed Systems", "PostgreSQL", "System Design", "gRPC"],
    fitScore: 96,
    behaviorScore: 94,
    growthScore: 92,
    activityScore: 88,
    leadership: 92,
    ownership: 95,
    communication: 88,
    initiative: 90,
    collaboration: 86,
    learning: 93,
    consistency: 91,
    aiSummary:
      "Strong backend engineer with growing AI expertise and exceptional ownership signals. Demonstrates rapid career progression and consistent high-impact delivery across distributed systems.",
    strengths: [
      "Owns end-to-end architecture for payment pipelines processing $2B+ annually",
      "Mentors 4 engineers — strong leadership trajectory",
      "Self-taught ML deployment, showing high learning mindset",
    ],
    concerns: ["Limited frontend exposure", "No prior team-lead title (yet acting as one)"],
    missingSkills: ["React", "TypeScript"],
    recruiterNotes:
      "Top-tier candidate. Acts as informal tech lead. Recommend fast-track to final round. Compensation expectations align with band.",
    confidence: 94,
    career: [
      { role: "Software Engineering Intern", period: "2017" },
      { role: "Software Engineer", period: "2018 — 2020" },
      { role: "Senior Engineer", period: "2020 — 2023" },
      { role: "Tech Lead (Acting)", period: "2023 — Present", current: true },
    ],
    promotionVelocity: 88,
    growthPotential: 92,
    careerMomentum: 90,
  },
  {
    id: "2",
    name: "Priya Nair",
    title: "ML Platform Engineer",
    company: "Eightfold AI",
    experience: 7,
    location: "Remote, IN",
    industry: "AI/ML",
    skills: ["Python", "PyTorch", "MLOps", "TensorFlow", "Kubeflow", "AWS SageMaker"],
    fitScore: 94,
    behaviorScore: 91,
    growthScore: 95,
    activityScore: 92,
    leadership: 85,
    ownership: 90,
    communication: 89,
    initiative: 93,
    collaboration: 88,
    learning: 96,
    consistency: 87,
    aiSummary:
      "Exceptional ML platform engineer with the highest growth potential in the pool. Combines deep technical depth with a strong learning mindset and initiative signals.",
    strengths: [
      "Built ML serving infra reducing inference latency by 60%",
      "Published 3 papers on efficient model serving",
      "Highest learning-mindset score in candidate pool",
    ],
    concerns: ["Leadership opportunities limited in current role", "Prefers IC track"],
    missingSkills: ["Go", "Kubernetes"],
    recruiterNotes:
      "Outstanding growth trajectory. Ideal for senior IC role. May need tailored leadership development plan.",
    confidence: 91,
    career: [
      { role: "Research Intern", period: "2018" },
      { role: "ML Engineer", period: "2019 — 2021" },
      { role: "Senior ML Engineer", period: "2021 — 2024" },
      { role: "ML Platform Engineer", period: "2024 — Present", current: true },
    ],
    promotionVelocity: 90,
    growthPotential: 96,
    careerMomentum: 93,
  },
  {
    id: "3",
    name: "Rohan Mehta",
    title: "Staff Software Engineer",
    company: "Atlassian",
    experience: 10,
    location: "Sydney, AU",
    industry: "SaaS",
    skills: ["Java", "Spring Boot", "AWS", "System Design", "Kafka", "Microservices"],
    fitScore: 91,
    behaviorScore: 93,
    growthScore: 85,
    activityScore: 79,
    leadership: 95,
    ownership: 92,
    communication: 91,
    initiative: 84,
    collaboration: 90,
    learning: 82,
    consistency: 89,
    aiSummary:
      "Seasoned staff engineer with the strongest leadership signals in the pool. Brings deep enterprise experience and high collaboration scores, though growth velocity has plateaued.",
    strengths: [
      "Leads a 12-engineer platform team",
      "Drove org-wide architecture decisions adopted by 30+ teams",
      "Excellent communicator — frequent conference speaker",
    ],
    concerns: ["Growth velocity plateaued in last 2 years", "Compensation expectations above band"],
    missingSkills: ["Python", "PyTorch"],
    recruiterNotes:
      "Strong leadership hire. Best for a staff/principal role. Verify compensation flexibility before proceeding.",
    confidence: 88,
    career: [
      { role: "Junior Developer", period: "2015" },
      { role: "Software Engineer", period: "2016 — 2019" },
      { role: "Senior Engineer", period: "2019 — 2022" },
      { role: "Staff Engineer", period: "2022 — Present", current: true },
    ],
    promotionVelocity: 78,
    growthPotential: 82,
    careerMomentum: 80,
  },
  {
    id: "4",
    name: "Ananya Reddy",
    title: "Full-Stack Engineer",
    company: "Rippling",
    experience: 5,
    location: "San Francisco, US",
    industry: "HR Tech",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "GraphQL", "AWS"],
    fitScore: 89,
    behaviorScore: 87,
    growthScore: 90,
    activityScore: 94,
    leadership: 80,
    ownership: 88,
    communication: 86,
    initiative: 89,
    collaboration: 85,
    learning: 91,
    consistency: 84,
    aiSummary:
      "High-activity full-stack engineer with strong growth potential. Most active candidate in the pool with a well-rounded skill set across the modern web stack.",
    strengths: [
      "Shipped 40+ features in the last year — highest activity score",
      "Full-stack versatility reduces team dependencies",
      "Strong initiative — led migration to GraphQL",
    ],
    concerns: ["Less deep in any single area", "Leadership experience still emerging"],
    missingSkills: ["Go", "Kubernetes"],
    recruiterNotes:
      "Great mid-level hire with high upside. Pair with a senior mentor for leadership development.",
    confidence: 86,
    career: [
      { role: "Intern", period: "2020" },
      { role: "Junior Engineer", period: "2021 — 2022" },
      { role: "Software Engineer", period: "2022 — 2024" },
      { role: "Full-Stack Engineer", period: "2024 — Present", current: true },
    ],
    promotionVelocity: 85,
    growthPotential: 90,
    careerMomentum: 88,
  },
  {
    id: "5",
    name: "Vikram Iyer",
    title: "DevOps Engineer",
    company: "Vercel",
    experience: 6,
    location: "Bengaluru, IN",
    industry: "DevTools",
    skills: ["Terraform", "AWS", "Kubernetes", "CI/CD", "Go", "Prometheus"],
    fitScore: 87,
    behaviorScore: 84,
    growthScore: 83,
    activityScore: 90,
    leadership: 78,
    ownership: 86,
    communication: 82,
    initiative: 85,
    collaboration: 83,
    learning: 80,
    consistency: 88,
    aiSummary:
      "Solid DevOps engineer with strong ownership and consistency signals. Reliable infrastructure operator with growing system-design depth.",
    strengths: [
      "Reduced deployment time by 70% via pipeline automation",
      "High consistency — zero critical incidents in 18 months",
      "Strong ownership of on-call rotations",
    ],
    concerns: ["Limited leadership exposure", "Growth potential moderate"],
    missingSkills: ["Python", "React"],
    recruiterNotes: "Reliable infra hire. Good cultural fit for platform team.",
    confidence: 83,
    career: [
      { role: "Support Engineer", period: "2019" },
      { role: "DevOps Engineer", period: "2020 — 2023" },
      { role: "Senior DevOps Engineer", period: "2023 — Present", current: true },
    ],
    promotionVelocity: 76,
    growthPotential: 80,
    careerMomentum: 78,
  },
  {
    id: "6",
    name: "Sneha Patel",
    title: "Data Engineer",
    company: "Snowflake",
    experience: 7,
    location: "Remote, IN",
    industry: "Data",
    skills: ["Python", "Spark", "Airflow", "dbt", "Snowflake", "SQL"],
    fitScore: 85,
    behaviorScore: 86,
    growthScore: 84,
    activityScore: 81,
    leadership: 82,
    ownership: 85,
    communication: 84,
    initiative: 80,
    collaboration: 87,
    learning: 83,
    consistency: 86,
    aiSummary:
      "Well-rounded data engineer with balanced behavioral signals. Strong collaboration and ownership make her a dependable team contributor.",
    strengths: [
      "Built data lake serving 5 product teams",
      "Strong collaboration — cross-functional favorite",
      "Consistent performer across 3 review cycles",
    ],
    concerns: ["Activity slightly below pool average", "Limited cloud-native depth"],
    missingSkills: ["Kubernetes", "Go"],
    recruiterNotes: "Solid data hire. Good for a collaborative team environment.",
    confidence: 82,
    career: [
      { role: "Analyst", period: "2018" },
      { role: "Data Engineer", period: "2019 — 2022" },
      { role: "Senior Data Engineer", period: "2022 — Present", current: true },
    ],
    promotionVelocity: 74,
    growthPotential: 81,
    careerMomentum: 77,
  },
  {
    id: "7",
    name: "Arjun Gupta",
    title: "Frontend Engineer",
    company: "Linear",
    experience: 4,
    location: "Remote, IN",
    industry: "DevTools",
    skills: ["React", "TypeScript", "Next.js", "Tailwind", "Framer Motion", "GraphQL"],
    fitScore: 83,
    behaviorScore: 80,
    growthScore: 88,
    activityScore: 86,
    leadership: 72,
    ownership: 81,
    communication: 79,
    initiative: 84,
    collaboration: 80,
    learning: 89,
    consistency: 78,
    aiSummary:
      "High-potential frontend engineer with strong growth and learning signals. Early in career but shows exceptional trajectory and craft focus.",
    strengths: [
      "Crafted award-winning UI components library",
      "Fastest learner in pool — picked up GraphQL in 2 weeks",
      "High initiative on design-system improvements",
    ],
    concerns: ["Limited experience", "Leadership not yet demonstrated"],
    missingSkills: ["Go", "AWS", "Kubernetes"],
    recruiterNotes: "High-upside junior hire. Invest in mentorship for strong ROI.",
    confidence: 79,
    career: [
      { role: "Intern", period: "2021" },
      { role: "Junior Frontend Engineer", period: "2022 — 2023" },
      { role: "Frontend Engineer", period: "2023 — Present", current: true },
    ],
    promotionVelocity: 82,
    growthPotential: 88,
    careerMomentum: 85,
  },
  {
    id: "8",
    name: "Kavya Krishnan",
    title: "Security Engineer",
    company: "Cloudflare",
    experience: 9,
    location: "London, UK",
    industry: "Security",
    skills: ["Python", "Rust", "Security", "Cryptography", "Linux", "Networking"],
    fitScore: 81,
    behaviorScore: 88,
    growthScore: 79,
    activityScore: 75,
    leadership: 84,
    ownership: 89,
    communication: 83,
    initiative: 80,
    collaboration: 82,
    learning: 78,
    consistency: 90,
    aiSummary:
      "Deeply experienced security engineer with the highest consistency score in the pool. Brings rare cryptographic depth and strong ownership.",
    strengths: [
      "Highest consistency score — 5 years of exceeds-expectations",
      "Designed zero-trust architecture adopted org-wide",
      "Deep cryptographic expertise",
    ],
    concerns: ["Activity declining", "Growth velocity slowing"],
    missingSkills: ["React", "Kubernetes"],
    recruiterNotes: "Specialist hire for security-critical role. Verify engagement level.",
    confidence: 80,
    career: [
      { role: "Security Analyst", period: "2016" },
      { role: "Security Engineer", period: "2017 — 2020" },
      { role: "Senior Security Engineer", period: "2020 — Present", current: true },
    ],
    promotionVelocity: 70,
    growthPotential: 76,
    careerMomentum: 73,
  },
];

export const jobAnalysis = {
  roleTitle: "Senior Software Engineer — Platform",
  roleSummary:
    "We are seeking a Senior Software Engineer to build and scale our core platform infrastructure. You will own distributed systems serving millions of requests, mentor junior engineers, and drive architectural decisions across the engineering org.",
  requiredSkills: [
    { name: "Distributed Systems", confidence: 95 },
    { name: "Go", confidence: 92 },
    { name: "Kubernetes", confidence: 90 },
    { name: "System Design", confidence: 94 },
    { name: "PostgreSQL", confidence: 88 },
  ],
  preferredSkills: [
    { name: "Python", confidence: 78 },
    { name: "PyTorch", confidence: 65 },
    { name: "GraphQL", confidence: 70 },
    { name: "Rust", confidence: 60 },
  ],
  behavioralTraits: [
    { name: "Leadership", score: 92 },
    { name: "Ownership", score: 95 },
    { name: "Communication", score: 85 },
    { name: "Initiative", score: 88 },
    { name: "Collaboration", score: 86 },
    { name: "Learning Mindset", score: 90 },
  ],
  hiringPriorities: [
    { priority: "System Design Depth", weight: 95 },
    { priority: "Ownership & Accountability", weight: 92 },
    { priority: "Leadership Potential", weight: 88 },
    { priority: "Distributed Systems Experience", weight: 90 },
    { priority: "Growth Trajectory", weight: 82 },
  ],
  explanation:
    "This role demands a blend of deep technical architecture skills and strong behavioral ownership. The AI weighted system design and ownership highest, reflecting the platform-critical nature of the work. Leadership potential is prioritized over raw years of experience.",
};

export const dashboardStats = {
  totalCandidates: 100243,
  topMatches: 1284,
  averageFitScore: 87,
  behavioralAlignment: 84,
};

export const hiringFunnel = [
  { stage: "Dataset", count: 100243, color: "#3b82f6" },
  { stage: "Retrieved", count: 8420, color: "#8b5cf6" },
  { stage: "Ranked", count: 1240, color: "#06b6d4" },
  { stage: "Shortlisted", count: 48, color: "#22c55e" },
];

export const recruiterInsights = [
  {
    title: "Strongest Candidate Cluster",
    insight:
      "Strongest candidate cluster demonstrates high ownership and leadership potential. 3 of the top 5 candidates show acting-lead behavior without formal titles.",
    type: "positive",
  },
  {
    title: "Skill Gap Identified",
    insight:
      "Only 12% of shortlisted candidates have both Go and Kubernetes depth. Consider expanding the search or offering ramp-up time.",
    type: "warning",
  },
  {
    title: "Behavioral Outlier",
    insight:
      "Candidate #1 (Aarav Sharma) scores in the 99th percentile for ownership — a rare signal correlated with long-term retention.",
    type: "highlight",
  },
];

export const analyticsData = {
  skillDistribution: [
    { skill: "Go", count: 4200 },
    { skill: "Python", count: 6800 },
    { skill: "React", count: 5400 },
    { skill: "Kubernetes", count: 3100 },
    { skill: "AWS", count: 7200 },
    { skill: "PostgreSQL", count: 4900 },
    { skill: "TypeScript", count: 6100 },
  ],
  industryDistribution: [
    { name: "Fintech", value: 28 },
    { name: "AI/ML", value: 22 },
    { name: "SaaS", value: 19 },
    { name: "DevTools", value: 14 },
    { name: "Data", value: 10 },
    { name: "Security", value: 7 },
  ],
  behaviorDistribution: [
    { trait: "Leadership", value: 84 },
    { trait: "Ownership", value: 88 },
    { trait: "Communication", value: 81 },
    { trait: "Initiative", value: 85 },
    { trait: "Collaboration", value: 83 },
    { trait: "Learning", value: 86 },
  ],
  qualityDistribution: [
    { range: "90-100", count: 48 },
    { range: "80-89", count: 312 },
    { range: "70-79", count: 880 },
    { range: "60-69", count: 1640 },
    { range: "50-59", count: 2980 },
  ],
  growthDistribution: [
    { range: "90-100", count: 62 },
    { range: "80-89", count: 410 },
    { range: "70-79", count: 920 },
    { range: "60-69", count: 1480 },
    { range: "50-59", count: 2100 },
  ],
};

export const copilotSuggestions = [
  "Why is Candidate A ranked higher?",
  "Show strongest leadership candidates.",
  "Show candidates with AI experience.",
  "Compare Candidate A and B.",
];

export function getCandidate(id: string): Candidate | undefined {
  return candidates.find((c) => c.id === id);
}