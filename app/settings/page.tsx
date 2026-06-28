"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Switch } from "../../components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

const SettingsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 p-8 overflow-auto"
    >
      <h1 className="text-3xl font-bold mb-6 text-white">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* General Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-[#111113] border border-white/10 rounded-xl shadow-lg p-6">
            <CardHeader>
              <CardTitle className="text-xl font-semibold mb-4 text-white">General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name" className="text-gray-300">Organization Name</Label>
                <Input
                  id="name"
                  defaultValue="TalentMind AI Inc."
                  className="bg-[#09090b] border border-white/10 text-white focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email" className="text-gray-300">Contact Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="info@talentmindai.com"
                  className="bg-[#09090b] border border-white/10 text-white focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode" className="text-gray-300">Dark Mode</Label>
                <Switch id="dark-mode" defaultChecked className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-700" />
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-[#111113] border border-white/10 rounded-xl shadow-lg p-6">
            <CardHeader>
              <CardTitle className="text-xl font-semibold mb-4 text-white">AI Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="ranking-model" className="text-gray-300">Ranking Algorithm</Label>
                <Select defaultValue="v3-ensemble">
                  <SelectTrigger className="bg-[#09090b] border border-white/10 text-white focus:ring-blue-500 focus:border-blue-500">
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1d] text-white border-white/10">
                    <SelectItem value="v3-ensemble">TalentRank v3 (Ensemble)</SelectItem>
                    <SelectItem value="v2-behavioral">TalentRank v2 (Behavioral Focus)</SelectItem>
                    <SelectItem value="v1-keyword">TalentRank v1 (Keyword Matching)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="explainability" className="text-gray-300">Enable AI Explainability</Label>
                <Switch id="explainability" defaultChecked className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-700" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="copilot-suggestions" className="text-gray-300">Copilot Proactive Suggestions</Label>
                <Switch id="copilot-suggestions" className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-700" />
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                Save AI Settings
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;
