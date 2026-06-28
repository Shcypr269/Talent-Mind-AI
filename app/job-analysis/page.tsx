"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";

const roleData = {
  summary: "Analyzing the role of a Senior Software Engineer specializing in AI/ML, focusing on scalable backend systems and intelligent algorithm development. Requires strong problem-solving skills and a proactive approach to system design.",
  requiredSkills: [
    { name: "Python", confidence: 95 },
    { name: "Machine Learning", confidence: 90 },
    { name: "Distributed Systems", confidence: 88 },
    { name: "Cloud Platforms (AWS/GCP)", confidence: 85 },
  ],
  preferredSkills: [
    { name: "Deep Learning Frameworks (TensorFlow/PyTorch)", confidence: 80 },
    { name: "Natural Language Processing", confidence: 75 },
    { name: "Containerization (Docker/Kubernetes)", confidence: 70 },
  ],
  behavioralTraits: [
    { name: "Leadership", score: 90, description: "Drives projects and mentors junior engineers." },
    { name: "Ownership", score: 85, description: "Takes full responsibility for features and systems." },
    { name: "Communication", score: 75, description: "Clearly articulates technical concepts." },
    { name: "Initiative", score: 80, description: "Proactively identifies and solves problems." },
  ],
  hiringPriorities: [
    "Strong background in AI/ML model deployment.",
    "Experience with large-scale data processing.",
    "Ability to work autonomously and in a team setting.",
  ],
};

const JobAnalysisPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 p-8 overflow-auto"
    >
      <h1 className="text-3xl font-bold mb-6 text-white">Job Analysis</h1>

      {/* Role Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <Card className="bg-[#111113] border border-white/10 rounded-xl shadow-lg p-6">
          <CardTitle className="text-xl font-semibold mb-4 text-white">Role Summary</CardTitle>
          <p className="text-gray-300 leading-relaxed">{roleData.summary}</p>
        </Card>
      </motion.div>

      {/* Required Skills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <Card className="bg-[#111113] border border-white/10 rounded-xl shadow-lg p-6">
          <CardTitle className="text-xl font-semibold mb-4 text-white">Required Skills</CardTitle>
          <div className="flex flex-wrap gap-3">
            {roleData.requiredSkills.map((skill, index) => (
              <Badge
                key={skill.name}
                className="px-4 py-2 bg-blue-600/20 text-blue-300 border border-blue-500/50 rounded-full text-sm font-medium transition-all duration-300 ease-in-out hover:scale-105"
              >
                {skill.name}{' '}
                <span className="ml-2 text-blue-200">({skill.confidence}%)</span>
              </Badge>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Preferred Skills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-8"
      >
        <Card className="bg-[#111113] border border-white/10 rounded-xl shadow-lg p-6">
          <CardTitle className="text-xl font-semibold mb-4 text-white">Preferred Skills</CardTitle>
          <div className="flex flex-wrap gap-3">
            {roleData.preferredSkills.map((skill, index) => (
              <Badge
                key={skill.name}
                className="px-4 py-2 bg-purple-600/20 text-purple-300 border border-purple-500/50 rounded-full text-sm font-medium transition-all duration-300 ease-in-out hover:scale-105"
              >
                {skill.name}{' '}
                <span className="ml-2 text-purple-200">({skill.confidence}%)</span>
              </Badge>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Behavioral Traits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-8"
      >
        <Card className="bg-[#111113] border border-white/10 rounded-xl shadow-lg p-6">
          <CardTitle className="text-xl font-semibold mb-4 text-white">Behavioral Traits</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roleData.behavioralTraits.map((trait, index) => (
              <div key={trait.name} className="flex flex-col">
                <div className="flex justify-between text-sm font-medium text-gray-300 mb-1">
                  <span>{trait.name}</span>
                  <span>{trait.score}%</span>
                </div>
                <Progress value={trait.score} className="h-2 bg-gray-700/50 data-[state=complete]:bg-blue-600" />
                <p className="text-xs text-gray-500 mt-2">{trait.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Hiring Priorities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="bg-[#111113] border border-white/10 rounded-xl shadow-lg p-6">
          <CardTitle className="text-xl font-semibold mb-4 text-white">Hiring Priorities</CardTitle>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            {roleData.hiringPriorities.map((priority, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
              >
                {priority}
              </motion.li>
            ))}
          </ul>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default JobAnalysisPage;
