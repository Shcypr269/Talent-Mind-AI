"use client";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { ScoreRing } from "../../../components/score-ring";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Separator } from "../../../components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { ChevronDown } from "lucide-react";

const candidatesData = [
  {
    id: "1",
    name: "Alice Johnson",
    title: "Senior AI Engineer",
    experience: "8 years",
    location: "Remote",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Alice+Johnson",
    skills: ["Python", "Deep Learning", "NLP", "AWS", "TensorFlow", "PyTorch", "GCP", "Kubernetes"],
    industries: ["Tech", "AI/ML", "SaaS"],
    fitScore: 98,
    behaviorScore: 95,
    growthScore: 97,
    activityScore: 96,
    aiSummary:
      "Alice is an exceptional Senior AI Engineer with a proven track record in developing and deploying large-scale deep learning models. Her expertise spans natural language processing and cloud platforms, demonstrating strong ownership and a proactive approach to problem-solving. She consistently drives innovation and excels in collaborative environments.",
    behavioralAnalysis: {
      leadership: 95,
      ownership: 90,
      communication: 88,
      initiative: 92,
      collaboration: 90,
      learningMindset: 95,
      consistency: 85,
    },
    careerTrajectory: [
      { year: 2016, title: "Software Engineer Intern", company: "InnovateX" },
      { year: 2017, title: "Software Engineer", company: "InnovateX" },
      { year: 2019, title: "Senior Software Engineer", company: "InnovateX" },
      { year: 2022, title: "Senior AI Engineer", company: "GlobalTech AI" },
    ],
    explainability: {
      whyThisCandidate: "Alice's deep learning expertise and strong behavioral alignment with leadership and ownership make her a top candidate. Her recent work on scalable NLP solutions directly addresses key requirements.",
      strengths: [
        { point: "Exceptional proficiency in Deep Learning and NLP.", confidence: 98 },
        { point: "Demonstrated leadership in previous roles.", confidence: 95 },
        { point: "Strong problem-solving and system design skills.", confidence: 93 },
      ],
      concerns: [
        { point: "Limited experience with Rust programming language.", confidence: 60 },
      ],
      missingSkills: [
        { skill: "Rust", relevance: 70 },
        { skill: "Blockchain", relevance: 50 },
      ],
      recruiterNotes: "Follow up on her experience leading cross-functional teams and specific achievements in deploying AI models to production.",
    },
  },
  {
    id: "2",
    name: "Bob Smith",
    title: "Lead Data Scientist",
    experience: "10 years",
    location: "New York",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Bob+Smith",
    skills: ["R", "Machine Learning", "Statistics", "GCP", "Big Data", "SQL"],
    industries: ["Finance", "Data Analytics"],
    fitScore: 95,
    behaviorScore: 92,
    growthScore: 94,
    activityScore: 90,
    aiSummary:
      "Bob is a highly experienced Lead Data Scientist with a strong background in statistical modeling and machine learning. He has a proven ability to lead data initiatives and translate complex data into actionable insights, showing excellent ownership and a consistent learning mindset.",
    behavioralAnalysis: {
      leadership: 90,
      ownership: 92,
      communication: 85,
      initiative: 88,
      collaboration: 80,
      learningMindset: 90,
      consistency: 90,
    },
    careerTrajectory: [
      { year: 2014, title: "Data Analyst", company: "QuantCorp" },
      { year: 2016, title: "Senior Data Analyst", company: "QuantCorp" },
      { year: 2019, title: "Data Scientist", company: "FinData Solutions" },
      { year: 2022, title: "Lead Data Scientist", company: "FinData Solutions" },
    ],
    explainability: {
      whyThisCandidate: "Bob's extensive experience in data science leadership and strong statistical background are ideal for roles requiring robust data interpretation and strategic insights.",
      strengths: [
        { point: "Deep expertise in statistical modeling and ML.", confidence: 97 },
        { point: "Proven leadership in data-driven projects.", confidence: 90 },
        { point: "Excellent communication of complex results.", confidence: 85 },
      ],
      concerns: [
        { point: "Less exposure to cutting-edge deep learning frameworks.", confidence: 70 },
      ],
      missingSkills: [
        { skill: "TensorFlow", relevance: 60 },
        { skill: "Kubernetes", relevance: 55 },
      ],
      recruiterNotes: "Assess his experience with real-time data streaming and his comfort level with newer AI/ML technologies.",
    },
  },
];

const CandidateDetailPage = () => {
  const params = useParams();
  const { id } = params;
  const candidate = candidatesData.find((c) => c.id === id);

  if (!candidate) {
    return (
      <div className="flex-1 p-8 text-white flex items-center justify-center">
        Candidate not found.
      </div>
    );
  }

  const behavioralChartData = [
    { trait: "Leadership", A: candidate.behavioralAnalysis.leadership, fullMark: 100 },
    { trait: "Ownership", A: candidate.behavioralAnalysis.ownership, fullMark: 100 },
    { trait: "Communication", A: candidate.behavioralAnalysis.communication, fullMark: 100 },
    { trait: "Initiative", A: candidate.behavioralAnalysis.initiative, fullMark: 100 },
    { trait: "Collaboration", A: candidate.behavioralAnalysis.collaboration, fullMark: 100 },
    { trait: "Learning Mindset", A: candidate.behavioralAnalysis.learningMindset, fullMark: 100 },
    { trait: "Consistency", A: candidate.behavioralAnalysis.consistency, fullMark: 100 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 p-8 overflow-auto text-white"
    >
      <h1 className="text-3xl font-bold mb-6">Candidate Profile: {candidate.name}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <Card className="bg-[#111113] border border-white/10 rounded-xl shadow-lg p-6 flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4 border-2 border-blue-500 shadow-xl">
              <AvatarImage src={candidate.avatar} />
              <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold mb-1 text-white">{candidate.name}</h2>
            <p className="text-blue-400 mb-2">{candidate.title}</p>
            <div className="flex items-center text-gray-400 text-sm mb-4">
              <span>{candidate.experience}</span>
              <Separator orientation="vertical" className="h-4 mx-2 bg-gray-600" />
              <span>{candidate.location}</span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {candidate.skills.map((skill) => (
                <Badge key={skill} className="bg-blue-600/20 text-blue-300 border border-blue-500/50">
                  {skill}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {candidate.industries.map((industry) => (
                <Badge key={industry} className="bg-purple-600/20 text-purple-300 border border-purple-500/50">
                  {industry}
                </Badge>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Center & Right Sides */}
        <div className="lg:col-span-2 space-y-8">
          {/* AI Summary and Quick Stats */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* AI Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="xl:col-span-2"
            >
              <Card className="bg-[#111113] border border-white/10 rounded-xl shadow-lg p-6">
                <CardTitle className="text-xl font-semibold mb-4 text-white">AI Summary</CardTitle>
                <p className="text-gray-300 leading-relaxed">{candidate.aiSummary}</p>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="xl:col-span-1"
            >
              <Card className="bg-[#111113] border border-white/10 rounded-xl shadow-lg p-6">
                <CardTitle className="text-xl font-semibold mb-4 text-white">Quick Stats</CardTitle>
                <div className="space-y-4">
                  <ScoreRing score={candidate.fitScore} label="Fit Score" color="#3B82F6" />
                  <ScoreRing score={candidate.behaviorScore} label="Behavior Score" color="#8B5CF6" />
                  <ScoreRing score={candidate.growthScore} label="Growth Score" color="#EC4899" />
                  <ScoreRing score={candidate.activityScore} label="Activity Score" color="#14B8A6" />
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Tabs for detailed analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Tabs defaultValue="behavioral" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-[#09090B] border-b border-white/10 rounded-none">
                <TabsTrigger
                  value="behavioral"
                  className="text-gray-400 data-[state=active]:text-blue-400 data-[state=active]:bg-[#111113] data-[state=active]:shadow-sm data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-t-lg transition-all duration-200"
                >
                  Behavioral Analysis
                </TabsTrigger>
                <TabsTrigger
                  value="career"
                  className="text-gray-400 data-[state=active]:text-purple-400 data-[state=active]:bg-[#111113] data-[state=active]:shadow-sm data-[state=active]:border-b-2 data-[state=active]:border-purple-500 rounded-t-lg transition-all duration-200"
                >
                  Career Trajectory
                </TabsTrigger>
                <TabsTrigger
                  value="explainability"
                  className="text-gray-400 data-[state=active]:text-cyan-400 data-[state=active]:bg-[#111113] data-[state=active]:shadow-sm data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 rounded-t-lg transition-all duration-200"
                >
                  AI Explainability
                </TabsTrigger>
                <TabsTrigger
                  value="notes"
                  className="text-gray-400 data-[state=active]:text-green-400 data-[state=active]:bg-[#111113] data-[state=active]:shadow-sm data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-t-lg transition-all duration-200"
                >
                  Recruiter Notes
                </TabsTrigger>
              </TabsList>
              <TabsContent value="behavioral" className="mt-4">
                <Card className="bg-[#111113] border border-white/10 rounded-xl shadow-lg p-6">
                  <CardTitle className="text-xl font-semibold mb-4 text-white">
                    Behavioral Analysis (Radar Chart)
                  </CardTitle>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={behavioralChartData}>
                        <PolarGrid stroke="#2a2a2e" />
                        <PolarAngleAxis dataKey="trait" stroke="#a1a1a1" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#2a2a2e" />
                        <Radar
                          name={candidate.name}
                          dataKey="A"
                          stroke="#8884d8"
                          fill="#8884d8"
                          fillOpacity={0.6}
                          animationBegin={0}
                          animationDuration={1500}
                          animationEasing="ease-out"
                        />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#1a1a1d", border: "none" }}
                          itemStyle={{ color: "#e5e7eb" }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(candidate.behavioralAnalysis).map(([trait, score], index) => (
                      <motion.div
                        key={trait}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-[#09090b] p-4 rounded-lg border border-white/10"
                      >
                        <h4 className="font-semibold text-blue-300 capitalize">
                          {trait.replace(/([A-Z])/g, " $1").trim()}: {score}%
                        </h4>
                        <p className="text-sm text-gray-400">
                          {/* Placeholder for detailed explanation */}
                          Candidate shows strong {trait.replace(/([A-Z])/g, " $1").trim()}.
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
              <TabsContent value="career" className="mt-4">
                <Card className="bg-[#111113] border border-white/10 rounded-xl shadow-lg p-6">
                  <CardTitle className="text-xl font-semibold mb-4 text-white">Career Trajectory</CardTitle>
                  <div className="relative pl-2 sm:pl-4">
                    {candidate.careerTrajectory.map((event, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="mb-8 flex items-start last:mb-0"
                      >
                        <div className="flex flex-col items-center mr-4">
                          <div className="w-3 h-3 rounded-full bg-blue-500 ring-4 ring-blue-500/20 z-10"></div>
                          {index < candidate.careerTrajectory.length - 1 && (
                            <div className="w-px h-full bg-gray-600/50 my-2"></div>
                          )}
                        </div>
                        <div className="flex-1 bg-[#09090b] p-4 rounded-lg border border-white/10 -mt-2">
                          <h4 className="font-semibold text-white">{event.title}</h4>
                          <p className="text-sm text-blue-300">{event.company}</p>
                          <p className="text-xs text-gray-500 mt-1">{event.year}</p>
                          {index === candidate.careerTrajectory.length - 1 && (
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                              <div className="p-3 bg-gradient-to-br from-blue-600/20 to-transparent rounded-lg border border-blue-500/50">
                                <p className="text-sm text-gray-400">Promotion Velocity</p>
                                <p className="text-lg font-bold text-blue-300">Fast</p>
                              </div>
                              <div className="p-3 bg-gradient-to-br from-purple-600/20 to-transparent rounded-lg border border-purple-500/50">
                                <p className="text-sm text-gray-400">Growth Potential</p>
                                <p className="text-lg font-bold text-purple-300">High</p>
                              </div>
                              <div className="p-3 bg-gradient-to-br from-cyan-600/20 to-transparent rounded-lg border border-cyan-500/50">
                                <p className="text-sm text-gray-400">Career Momentum</p>
                                <p className="text-lg font-bold text-cyan-300">Strong</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
              <TabsContent value="explainability" className="mt-4">
                <Card className="bg-[#111113] border border-white/10 rounded-xl shadow-lg p-6">
                  <CardTitle className="text-xl font-semibold mb-4 text-white">AI Explainability</CardTitle>
                  <div className="space-y-6">
                    {/* Why This Candidate? */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="bg-[#09090b] p-4 rounded-lg border border-white/10"
                    >
                      <h3 className="font-semibold text-lg text-blue-300 mb-2">Why This Candidate?</h3>
                      <p className="text-gray-300">{candidate.explainability.whyThisCandidate}</p>
                    </motion.div>

                    {/* Strengths */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="bg-[#09090b] p-4 rounded-lg border border-white/10"
                    >
                      <h3 className="font-semibold text-lg text-green-300 mb-2">Strengths</h3>
                      <ul className="list-disc list-inside space-y-2">
                        {candidate.explainability.strengths.map((s, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }}
                            className="text-gray-300"
                          >
                            {s.point}{" "}
                            <Badge className="ml-2 bg-green-600/20 text-green-300 border border-green-500/50">
                              Confidence: {s.confidence}%
                            </Badge>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Concerns */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="bg-[#09090b] p-4 rounded-lg border border-white/10"
                    >
                      <h3 className="font-semibold text-lg text-red-300 mb-2">Concerns</h3>
                      <ul className="list-disc list-inside space-y-2">
                        {candidate.explainability.concerns.map((c, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 + 0.3 }}
                            className="text-gray-300"
                          >
                            {c.point}{" "}
                            <Badge className="ml-2 bg-red-600/20 text-red-300 border border-red-500/50">
                              Confidence: {c.confidence}%
                            </Badge>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Missing Skills */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="bg-[#09090b] p-4 rounded-lg border border-white/10"
                    >
                      <h3 className="font-semibold text-lg text-orange-300 mb-2">Missing Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {candidate.explainability.missingSkills.map((ms, index) => (
                          <Badge key={index} className="bg-orange-600/20 text-orange-300 border border-orange-500/50">
                            {ms.skill} (Relevance: {ms.relevance}%)
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </Card>
              </TabsContent>
              <TabsContent value="notes" className="mt-4">
                <Card className="bg-[#111113] border border-white/10 rounded-xl shadow-lg p-6">
                  <CardTitle className="text-xl font-semibold mb-4 text-white">Recruiter Notes</CardTitle>
                  <p className="text-gray-300 leading-relaxed">{candidate.explainability.recruiterNotes}</p>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CandidateDetailPage;
