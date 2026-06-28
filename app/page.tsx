"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { ParticleNetwork } from "../components/particle-network";
import { Button } from "../components/ui/button";
import { ArrowRight, Sparkles, Brain, BarChart3, Users, Target, Zap, Shield, TrendingUp } from "lucide-react";

const FloatingCard = ({ children, className, delay }: { children: React.ReactNode; className?: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={`absolute p-4 rounded-lg shadow-lg backdrop-blur-md border border-white/10 ${className}`}
  >
    {children}
  </motion.div>
);

const features = [
  {
    title: "Role Understanding",
    icon: Target,
    desc: "Deep AI comprehension of job requirements beyond keyword matching, understanding context, culture, and growth trajectory.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Candidate Intelligence",
    icon: Brain,
    desc: "Comprehensive candidate profiles enriched with AI-generated insights, skill validation, and experience verification.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Behavioral Signals",
    icon: BarChart3,
    desc: "Advanced behavioral analysis across 7 dimensions including leadership, ownership, and collaboration signals.",
    gradient: "from-cyan-500 to-teal-500",
  },
  {
    title: "Career Growth Analysis",
    icon: TrendingUp,
    desc: "Predictive career trajectory modeling with promotion velocity and growth potential scoring.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "AI Recruiter Copilot",
    icon: Zap,
    desc: "Conversational AI assistant that answers hiring questions, compares candidates, and provides deep insights.",
    gradient: "from-blue-500 to-purple-500",
  },
  {
    title: "Explainable Rankings",
    icon: Shield,
    desc: "Transparent, interpretable rankings with detailed reasoning for every candidate score and recommendation.",
    gradient: "from-green-500 to-emerald-500",
  },
];

export default function LandingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col font-inter overflow-x-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden">
        <ParticleNetwork />
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="z-10 text-center px-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-8"
          >
            <Sparkles className="h-4 w-4" />
            AI-Powered Hiring Intelligence
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
              TalentMind
            </span>
            <span className="text-white"> AI</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-300"
          >
            AI-powered hiring intelligence that understands talent beyond keywords.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link href="/demo">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-600/25">
                Try Demo <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/ranking">
              <Button variant="outline" size="lg" className="border-white/20 hover:bg-white/5">
                View Rankings
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Cards */}
        <div className="hidden lg:block">
          <FloatingCard className="top-1/4 left-10 animate-float" delay={0.6}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-300">Candidate Score</h4>
                <p className="text-sm text-gray-400">92% Fit</p>
              </div>
            </div>
          </FloatingCard>
          <FloatingCard className="bottom-1/4 right-10 animate-float-slow" delay={0.8}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Brain className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <h4 className="font-semibold text-purple-300">Behavioral Analysis</h4>
                <p className="text-sm text-gray-400">High Ownership</p>
              </div>
            </div>
          </FloatingCard>
          <FloatingCard className="top-1/2 left-1/4 -translate-x-1/2 animate-float" delay={1}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <Zap className="h-5 w-5 text-cyan-400" />
              </div>
              <div>
                <h4 className="font-semibold text-cyan-300">AI Insights</h4>
                <p className="text-sm text-gray-400">Role Alignment</p>
              </div>
            </div>
          </FloatingCard>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1"
          >
            <div className="w-1.5 h-3 rounded-full bg-gradient-to-b from-blue-400 to-purple-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-[#111113] relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Built for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Modern Hiring
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to make intelligent, data-driven hiring decisions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, index) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-6 rounded-xl bg-[#09090b] border border-white/5 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feat.gradient} p-2.5 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feat.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                  {feat.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {feat.desc}
                </p>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-cyan-500/5 transition-all duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-[#09090b] relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "100K+", label: "Candidates Analyzed", icon: Users },
              { value: "99.9%", label: "Ranking Accuracy", icon: Target },
              { value: "7", label: "Behavioral Dimensions", icon: Brain },
              { value: "3x", label: "Faster Hiring", icon: TrendingUp },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-blue-400" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#111113] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-cyan-600/10" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Hiring Process
              </span>
              ?
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Join forward-thinking companies using TalentMind AI to make smarter, faster, and more equitable hiring decisions.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/demo">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-600/25">
                  Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="border-white/20 hover:bg-white/5">
                  Explore Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500">
            &copy; 2026 TalentMind AI. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/dashboard" className="hover:text-gray-300 transition-colors">Dashboard</Link>
            <Link href="/ranking" className="hover:text-gray-300 transition-colors">Rankings</Link>
            <Link href="/ai-copilot" className="hover:text-gray-300 transition-colors">AI Copilot</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}