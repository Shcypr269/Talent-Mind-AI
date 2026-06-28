"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, BarChart2, Users, Briefcase, Bot, Settings, Bell, Search, UploadCloud, ChevronLeft, ChevronRight, LayoutDashboard, Target, Moon, Sun } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Job Analysis", href: "/job-analysis", icon: Briefcase },
  { name: "Candidate Rankings", href: "/ranking", icon: BarChart2 },
  { name: "Candidate Profiles", href: "/candidate/1", icon: Users }, // Example for first candidate
  { name: "AI Copilot", href: "/ai-copilot", icon: Bot },
  { name: "Analytics", href: "/analytics", icon: Target },
  { name: "Submission Center", href: "/submission", icon: UploadCloud },
  { name: "Settings", href: "/settings", icon: Settings },
];

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#09090B] text-white font-inter">
      {/* Sidebar */}
      <motion.aside
        initial={{ width: isSidebarOpen ? 240 : 80 }}
        animate={{ width: isSidebarOpen ? 240 : 80 }}
        transition={{ duration: 0.3 }}
        className="bg-[#111113] border-r border-white/10 p-4 flex flex-col shadow-lg"
      >
        <div className="mb-8 flex items-center justify-between">
          {isSidebarOpen ? (
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              TalentMind AI
            </h2>
          ) : (
            <Bot className="h-8 w-8 text-blue-400" />
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-400 hover:bg-white/10"
          >
            {isSidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </Button>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link href={item.href} key={item.name} passHref>
              <motion.div
                whileHover={{ scale: 1.02, backgroundColor: "#1a1a1d" }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                  pathname.startsWith(item.href)
                    ? "bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white shadow-md border border-blue-500/50"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {isSidebarOpen && <span className="ml-3 text-sm font-medium">{item.name}</span>}
              </motion.div>
            </Link>
          ))}
        </nav>
      </motion.aside>

      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-[#111113] border-b border-white/10 p-4 flex items-center justify-between shadow-lg z-20"
        >
          <div className="flex items-center flex-1 mr-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search candidates, roles, insights..."
                className="w-full pl-9 pr-3 py-2 bg-[#09090B] border border-white/10 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:bg-white/10 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:bg-white/10">
              <Moon className="h-5 w-5" />
            </Button>
            <Avatar className="h-9 w-9 border border-white/20">
              <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=John+Doe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </motion.header>

        {/* Main Workspace */}
        <main className="flex-1 overflow-auto custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
