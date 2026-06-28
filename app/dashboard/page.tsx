"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { AnimatedCounter } from "../../components/animated-counter";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, Target, Brain, TrendingUp, ArrowUpRight, Sparkles } from "lucide-react";

const kpiData = [
  { title: "Total Candidates", value: 100000, suffix: "+", delay: 0, icon: Users, gradient: "from-blue-500 to-cyan-500" },
  { title: "Top Matches", value: 500, suffix: "", delay: 0.1, icon: Target, gradient: "from-purple-500 to-pink-500" },
  { title: "Average Fit Score", value: 85, suffix: "%", delay: 0.2, icon: Brain, gradient: "from-cyan-500 to-teal-500" },
  { title: "Behavioral Alignment", value: 90, suffix: "%", delay: 0.3, icon: TrendingUp, gradient: "from-amber-500 to-orange-500" },
];

const funnelData = [
  { name: "Dataset", value: 100000, fill: "#3B82F6" },
  { name: "Retrieved", value: 50000, fill: "#6366F1" },
  { name: "Ranked", value: 10000, fill: "#8B5CF6" },
  { name: "Shortlisted", value: 500, fill: "#A855F7" },
];

const insights = [
  {
    text: "Strongest candidate cluster demonstrates high ownership and leadership potential.",
    subtext: "This indicates a robust pool of talent for leadership-track roles, suggesting a focus on targeted outreach to these individuals could yield high-quality hires quickly.",
    gradient: "from-blue-400 to-purple-400",
  },
  {
    text: "AI experience candidates show 23% higher retention probability.",
    subtext: "Candidates with demonstrated AI/ML expertise tend to stay longer and grow faster within technical organizations.",
    gradient: "from-cyan-400 to-teal-400",
  },
  {
    text: "Remote candidates exhibit 15% higher behavioral alignment scores.",
    subtext: "Remote talent pool shows stronger self-management and communication signals, ideal for distributed teams.",
    gradient: "from-amber-400 to-orange-400",
  },
];

const DashboardPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 p-8 overflow-auto"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Executive Dashboard</h1>
          <p className="text-gray-400 mt-1">Real-time hiring intelligence overview</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">
          <Sparkles className="h-4 w-4" />
          AI Insights Updated
        </div>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: kpi.delay }}
          >
            <Card className="bg-[#111113] border border-white/10 rounded-xl shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  {kpi.title}
                </CardTitle>
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${kpi.gradient} p-1.5 group-hover:scale-110 transition-transform duration-300`}>
                  <kpi.icon className="w-full h-full text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                  <AnimatedCounter value={kpi.value} duration={1} delay={kpi.delay} />
                  {kpi.suffix}
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="h-3 w-3 text-green-400" />
                  <p className="text-xs text-green-400">+20.1% from last month</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recruiter Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-8"
      >
        <Card className="bg-[#111113] border border-white/10 rounded-xl shadow-lg p-6">
          <CardTitle className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-400" />
            Recruiter Insights
          </CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights.map((insight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="p-4 rounded-lg bg-[#09090b] border border-white/5 hover:border-white/20 transition-all duration-300"
              >
                <p className={`text-sm font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${insight.gradient}`}>
                  "{insight.text}"
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {insight.subtext}
                </p>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Hiring Funnel Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <Card className="lg:col-span-2 bg-[#111113] border border-white/10 rounded-xl shadow-lg p-6">
          <CardTitle className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-400" />
            Hiring Funnel
          </CardTitle>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2e" />
                <XAxis type="number" stroke="#a1a1a1" tickFormatter={(value) => value >= 1000 ? `${(value/1000).toFixed(0)}K` : value} />
                <YAxis dataKey="name" type="category" stroke="#a1a1a1" width={100} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1a1a1d", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
                  itemStyle={{ color: "#e5e7eb" }}
                  formatter={(value: any) => [value >= 1000 ? `${(value/1000).toFixed(0)}K` : value, "Candidates"]}
                />
                <Bar
                  dataKey="value"
                  fill="#8884d8"
                  animationBegin={0}
                  animationDuration={1500}
                  animationEasing="ease-out"
                  radius={[0, 8, 8, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Funnel Summary */}
        <Card className="bg-[#111113] border border-white/10 rounded-xl shadow-lg p-6">
          <CardTitle className="text-xl font-semibold mb-4 text-white">Funnel Summary</CardTitle>
          <div className="space-y-4">
            {funnelData.map((stage, i) => (
              <motion.div
                key={stage.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg bg-[#09090b] border border-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stage.fill }} />
                  <span className="text-sm text-gray-300">{stage.name}</span>
                </div>
                <span className="text-sm font-semibold text-white">
                  {stage.value >= 1000 ? `${(stage.value/1000).toFixed(0)}K` : stage.value}
                </span>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="pt-4 border-t border-white/10"
            >
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">Conversion Rate</p>
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                  0.5%
                </p>
              </div>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;