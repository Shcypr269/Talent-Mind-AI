"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const skillDistributionData = [
  { name: "Machine Learning", count: 400, fill: "#8884d8" },
  { name: "NLP", count: 300, fill: "#82ca9d" },
  { name: "Data Science", count: 200, fill: "#ffc658" },
  { name: "Cloud (AWS)", count: 278, fill: "#ff7f50" },
  { name: "Python", count: 189, fill: "#83a6ed" },
];

const industryDistributionData = [
  { name: "Tech", value: 400, color: "#0088FE" },
  { name: "Finance", value: 300, color: "#00C49F" },
  { name: "Healthcare", value: 300, color: "#FFBB28" },
  { name: "Manufacturing", value: 200, color: "#FF8042" },
];

const behaviorDistributionData = [
  { name: "Leadership", score: 90 },
  { name: "Ownership", score: 85 },
  { name: "Communication", score: 75 },
  { name: "Collaboration", score: 80 },
];

const growthPotentialData = [
  { name: "Low", candidates: 150 },
  { name: "Medium", candidates: 500 },
  { name: "High", candidates: 350 },
  { name: "Very High", candidates: 100 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AnalyticsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 p-8 overflow-auto"
    >
      <h1 className="text-3xl font-bold mb-6 text-white">Advanced Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Skill Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-[#111113] border border-white/10 rounded-xl shadow-lg p-6">
            <CardTitle className="text-xl font-semibold mb-4 text-white">Skill Distribution</CardTitle>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={skillDistributionData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2e" />
                  <XAxis dataKey="name" stroke="#a1a1a1" />
                  <YAxis stroke="#a1a1a1" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1a1a1d", border: "none" }}
                    itemStyle={{ color: "#e5e7eb" }}
                  />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" animationBegin={0} animationDuration={1000} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Industry Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-[#111113] border border-white/10 rounded-xl shadow-lg p-6">
            <CardTitle className="text-xl font-semibold mb-4 text-white">Industry Distribution</CardTitle>
            <div className="h-72 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={industryDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1000}
                  >
                    {industryDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1a1a1d", border: "none" }}
                    itemStyle={{ color: "#e5e7eb" }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Behavior Distribution (Example using LineChart) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="bg-[#111113] border border-white/10 rounded-xl shadow-lg p-6">
            <CardTitle className="text-xl font-semibold mb-4 text-white">Behavior Distribution</CardTitle>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={behaviorDistributionData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2e" />
                  <XAxis dataKey="name" stroke="#a1a1a1" />
                  <YAxis stroke="#a1a1a1" domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1a1a1d", border: "none" }}
                    itemStyle={{ color: "#e5e7eb" }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#82ca9d"
                    activeDot={{ r: 8 }}
                    animationBegin={0}
                    animationDuration={1000}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Growth Potential Distribution (Example using BarChart) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-[#111113] border border-white/10 rounded-xl shadow-lg p-6">
            <CardTitle className="text-xl font-semibold mb-4 text-white">Growth Potential Distribution</CardTitle>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={growthPotentialData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2e" />
                  <XAxis dataKey="name" stroke="#a1a1a1" />
                  <YAxis stroke="#a1a1a1" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1a1a1d", border: "none" }}
                    itemStyle={{ color: "#e5e7eb" }}
                  />
                  <Bar dataKey="candidates" fill="#ffc658" animationBegin={0} animationDuration={1000} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AnalyticsPage;
