"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { ArrowUpDown, ChevronDown, MoreHorizontal, Medal, TrendingUp, Star, Zap, Eye, ExternalLink } from "lucide-react";
import Link from "next/link";

const candidatesData = [
  {
    id: "1",
    rank: 1,
    name: "Alice Johnson",
    title: "Senior AI Engineer",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Alice+Johnson",
    fitScore: 98,
    behaviorScore: 95,
    growthScore: 97,
    activityScore: 96,
    skills: ["Python", "Deep Learning", "NLP", "AWS"],
    experience: "8 years",
    industry: "Tech",
    behavior: "Leadership",
    location: "Remote",
  },
  {
    id: "2",
    rank: 2,
    name: "Bob Smith",
    title: "Lead Data Scientist",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Bob+Smith",
    fitScore: 95,
    behaviorScore: 92,
    growthScore: 94,
    activityScore: 90,
    skills: ["R", "Machine Learning", "Statistics", "GCP"],
    experience: "10 years",
    industry: "Finance",
    behavior: "Ownership",
    location: "New York",
  },
  {
    id: "3",
    rank: 3,
    name: "Charlie Brown",
    title: "ML Research Scientist",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Charlie+Brown",
    fitScore: 92,
    behaviorScore: 90,
    growthScore: 91,
    activityScore: 88,
    skills: ["Python", "Computer Vision", "Research", "TensorFlow"],
    experience: "6 years",
    industry: "Academia",
    behavior: "Innovation",
    location: "San Francisco",
  },
  {
    id: "4",
    rank: 4,
    name: "Diana Prince",
    title: "Principal Software Engineer",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Diana+Prince",
    fitScore: 90,
    behaviorScore: 88,
    growthScore: 90,
    activityScore: 92,
    skills: ["Java", "Distributed Systems", "Azure", "Microservices"],
    experience: "12 years",
    industry: "Enterprise",
    behavior: "Collaboration",
    location: "Seattle",
  },
  {
    id: "5",
    rank: 5,
    name: "Eve Adams",
    title: "AI Product Manager",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Eve+Adams",
    fitScore: 88,
    behaviorScore: 85,
    growthScore: 89,
    activityScore: 87,
    skills: ["Product Management", "AI Strategy", "Market Analysis", "Agile"],
    experience: "7 years",
    industry: "Tech",
    behavior: "Communication",
    location: "Boston",
  },
  {
    id: "6",
    rank: 6,
    name: "Frank Castle",
    title: "MLOps Engineer",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Frank+Castle",
    fitScore: 86,
    behaviorScore: 82,
    growthScore: 88,
    activityScore: 84,
    skills: ["Docker", "Kubernetes", "MLflow", "CI/CD"],
    experience: "5 years",
    industry: "Tech",
    behavior: "Ownership",
    location: "Austin",
  },
  {
    id: "7",
    rank: 7,
    name: "Grace Hopper",
    title: "Research Scientist",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Grace+Hopper",
    fitScore: 85,
    behaviorScore: 87,
    growthScore: 86,
    activityScore: 83,
    skills: ["Python", "Quantum Computing", "Algorithms", "C++"],
    experience: "9 years",
    industry: "Academia",
    behavior: "Innovation",
    location: "Cambridge",
  },
  {
    id: "8",
    rank: 8,
    name: "Henry Cavill",
    title: "Data Engineer",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Henry+Cavill",
    fitScore: 83,
    behaviorScore: 80,
    growthScore: 85,
    activityScore: 82,
    skills: ["SQL", "Spark", "Airflow", "Snowflake"],
    experience: "6 years",
    industry: "Finance",
    behavior: "Collaboration",
    location: "Chicago",
  },
];

const CandidateRankingPage = () => {
  const [filters, setFilters] = useState({
    skills: "",
    experience: "",
    industry: "",
    behavior: "",
    location: "",
  });
  const [sortBy, setSortBy] = useState("highestFit");

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredCandidates = candidatesData.filter((candidate) => {
    return (
      (filters.skills === "" ||
        candidate.skills.some((skill) =>
          skill.toLowerCase().includes(filters.skills.toLowerCase())
        )) &&
      (filters.experience === "" ||
        candidate.experience.includes(filters.experience)) &&
      (filters.industry === "" ||
        candidate.industry.toLowerCase().includes(filters.industry.toLowerCase())) &&
      (filters.behavior === "" ||
        candidate.behavior.toLowerCase().includes(filters.behavior.toLowerCase())) &&
      (filters.location === "" ||
        candidate.location.toLowerCase().includes(filters.location.toLowerCase()))
    );
  });

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (sortBy === "highestFit") return b.fitScore - a.fitScore;
    if (sortBy === "highestGrowth") return b.growthScore - a.growthScore;
    if (sortBy === "highestLeadership") return b.behaviorScore - a.behaviorScore;
    if (sortBy === "mostActive") return b.activityScore - a.activityScore;
    return 0;
  });

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Medal className="h-5 w-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-300" />;
    if (rank === 3) return <Medal className="h-5 w-5 text-amber-600" />;
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 p-8 overflow-auto"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Candidate Rankings</h1>
          <p className="text-gray-400 mt-1">AI-powered candidate leaderboard with behavioral insights</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm">
          <Zap className="h-4 w-4" />
          {sortedCandidates.length} Candidates
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <Input
          placeholder="Filter by skills..."
          className="bg-[#111113] border border-white/10 text-white"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFilterChange("skills", e.target.value)}
        />
        <Select onValueChange={(value) => handleFilterChange("experience", value)}>
          <SelectTrigger className="bg-[#111113] border border-white/10 text-white">
            <SelectValue placeholder="Experience" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1d] text-white border-white/10">
            <SelectItem value="">All Experience</SelectItem>
            <SelectItem value="6 years">6+ Years</SelectItem>
            <SelectItem value="8 years">8+ Years</SelectItem>
            <SelectItem value="10 years">10+ Years</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange("industry", value)}>
          <SelectTrigger className="bg-[#111113] border border-white/10 text-white">
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1d] text-white border-white/10">
            <SelectItem value="">All Industries</SelectItem>
            <SelectItem value="Tech">Tech</SelectItem>
            <SelectItem value="Finance">Finance</SelectItem>
            <SelectItem value="Academia">Academia</SelectItem>
            <SelectItem value="Enterprise">Enterprise</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange("behavior", value)}>
          <SelectTrigger className="bg-[#111113] border border-white/10 text-white">
            <SelectValue placeholder="Behavior" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1d] text-white border-white/10">
            <SelectItem value="">All Behaviors</SelectItem>
            <SelectItem value="Leadership">Leadership</SelectItem>
            <SelectItem value="Ownership">Ownership</SelectItem>
            <SelectItem value="Innovation">Innovation</SelectItem>
            <SelectItem value="Collaboration">Collaboration</SelectItem>
            <SelectItem value="Communication">Communication</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange("location", value)}>
          <SelectTrigger className="bg-[#111113] border border-white/10 text-white">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1d] text-white border-white/10">
            <SelectItem value="">All Locations</SelectItem>
            <SelectItem value="Remote">Remote</SelectItem>
            <SelectItem value="New York">New York</SelectItem>
            <SelectItem value="San Francisco">San Francisco</SelectItem>
            <SelectItem value="Seattle">Seattle</SelectItem>
            <SelectItem value="Boston">Boston</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end mb-6">
        <Select onValueChange={(value) => setSortBy(value)}>
          <SelectTrigger className="w-[200px] bg-[#111113] border border-white/10 text-white">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1d] text-white border-white/10">
            <SelectItem value="highestFit">
              <div className="flex items-center gap-2"><Star className="h-4 w-4" /> Highest Fit</div>
            </SelectItem>
            <SelectItem value="highestGrowth">
              <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Highest Growth</div>
            </SelectItem>
            <SelectItem value="highestLeadership">
              <div className="flex items-center gap-2"><Star className="h-4 w-4" /> Highest Leadership</div>
            </SelectItem>
            <SelectItem value="mostActive">
              <div className="flex items-center gap-2"><Zap className="h-4 w-4" /> Most Active</div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Candidate Leaderboard */}
      <Card className="bg-[#111113] border border-white/10 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="text-gray-400 text-sm border-b border-white/10 bg-[#0d0d0f]">
                <th className="px-6 py-4 font-medium">Rank</th>
                <th className="px-6 py-4 font-medium">Candidate</th>
                <th className="px-6 py-4 font-medium">Fit Score <ArrowUpDown className="inline-block h-4 w-4 ml-1" /></th>
                <th className="px-6 py-4 font-medium">Behavior Score</th>
                <th className="px-6 py-4 font-medium">Growth Score</th>
                <th className="px-6 py-4 font-medium">Activity Score</th>
                <th className="px-6 py-4 font-medium">Skills</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedCandidates.map((candidate, index) => (
                <motion.tr
                  key={candidate.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`border-b border-white/5 last:border-b-0 group ${
                    candidate.rank === 1
                      ? "bg-gradient-to-r from-yellow-600/10 via-yellow-600/5 to-transparent hover:from-yellow-600/20"
                      : "hover:bg-[#1a1a1d]"
                  } transition-all duration-300`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getRankIcon(candidate.rank)}
                      <span
                        className={`font-bold ${
                          candidate.rank === 1
                            ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 text-lg"
                            : candidate.rank <= 3
                            ? "text-gray-200"
                            : "text-gray-400"
                        }`}
                      >
                        #{candidate.rank}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/candidate/${candidate.id}`} className="flex items-center group/link">
                      <Avatar className={`h-10 w-10 mr-3 border-2 group-hover/link:scale-110 transition-transform duration-200 ${
                        candidate.rank === 1 ? "border-yellow-500/50" : "border-white/10"
                      }`}>
                        <AvatarImage src={candidate.avatar} />
                        <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-white group-hover/link:text-blue-400 transition-colors flex items-center gap-1">
                          {candidate.name}
                          <ExternalLink className="h-3 w-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                        </div>
                        <div className="text-sm text-gray-500">
                          {candidate.title}
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-700/30 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${candidate.fitScore}%` }}
                          transition={{ duration: 1, delay: index * 0.05 }}
                          className={`h-full rounded-full ${
                            candidate.fitScore > 90 ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-gray-500"
                          }`}
                        />
                      </div>
                      <Badge
                        className={`text-xs font-semibold ${
                          candidate.fitScore > 90
                            ? "bg-blue-600/20 text-blue-300 border border-blue-500/50"
                            : "bg-gray-700/30 text-gray-300 border border-gray-600/50"
                        }`}
                      >
                        {candidate.fitScore}%
                      </Badge>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={`text-xs font-semibold ${
                      candidate.behaviorScore > 90
                        ? "bg-purple-600/20 text-purple-300 border border-purple-500/50"
                        : "bg-gray-700/30 text-gray-300 border border-gray-600/50"
                    }`}>
                      {candidate.behaviorScore}%
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={`text-xs font-semibold ${
                      candidate.growthScore > 90
                        ? "bg-cyan-600/20 text-cyan-300 border border-cyan-500/50"
                        : "bg-gray-700/30 text-gray-300 border border-gray-600/50"
                    }`}>
                      {candidate.growthScore}%
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={`text-xs font-semibold ${
                      candidate.activityScore > 90
                        ? "bg-green-600/20 text-green-300 border border-green-500/50"
                        : "bg-gray-700/30 text-gray-300 border border-gray-600/50"
                    }`}>
                      {candidate.activityScore}%
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {candidate.skills.slice(0, 3).map((skill) => (
                        <span key={skill} className="text-xs px-2 py-0.5 rounded-full bg-blue-600/10 text-blue-300 border border-blue-500/20">
                          {skill}
                        </span>
                      ))}
                      {candidate.skills.length > 3 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-600/20 text-gray-400">
                          +{candidate.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/candidate/${candidate.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                        >
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                      </Link>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
};

export default CandidateRankingPage;