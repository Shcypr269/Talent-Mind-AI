"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ParticleNetwork } from "../../components/particle-network";
import { Button } from "../../components/ui/button";
import { ArrowRight, Sparkles, BarChart3, Brain, Users } from "lucide-react";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col font-inter">
      <div className="absolute top-0 left-0 right-0 z-50 p-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          TalentMind AI
        </Link>
        <Link href="/dashboard">
          <Button variant="outline" className="border-white/20">
            Go to App <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <section className="relative flex-1 flex flex-col items-center justify-center py-20 overflow-hidden">
        <ParticleNetwork />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center z-10 max-w-4xl px-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-8"
          >
            <Sparkles className="h-4 w-4" />
            Interactive Demo
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            See{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
              TalentMind AI
            </span>{" "}
            in Action
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Experience how our AI-powered platform transforms hiring with deep candidate intelligence, behavioral analysis, and explainable rankings.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: BarChart3, title: "Smart Rankings", desc: "AI-driven candidate scoring beyond keywords" },
              { icon: Brain, title: "Behavioral AI", desc: "Deep analysis of leadership, ownership, and growth signals" },
              { icon: Users, title: "Talent Intelligence", desc: "Comprehensive candidate profiles with AI insights" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="p-6 rounded-xl bg-[#111113] border border-white/10 hover:border-blue-500/50 transition-all duration-300"
              >
                <item.icon className="h-8 w-8 text-blue-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link href="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
                Explore Dashboard <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/ranking">
              <Button variant="outline" size="lg" className="border-white/20">
                View Rankings
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}