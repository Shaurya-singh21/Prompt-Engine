"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loading";
import {
  Rocket,
  Users,
  Edit,
  Search,
  Copy,
  Code,
  CheckCircle,
  Briefcase,
  GraduationCap,
  Palette,
  Lightbulb,
} from "lucide-react";

const PromptEngineHomepage = () => {
  const { data: session, status } = useSession();

  return (
    <>
      {status === "loading" ? (
        <Loader />
      ) : (
        <div className="min-h-screen   text-white">
          {/* Hero Section */}
          <div className="sm:p-20 p-10 bg-gradient-to-r from-green-950/10 via-teal-900/10 to-cyan-950/30 flex flex-col items-center justify-center ">
            <h1 className="text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Unleash the Power
              </span>
              <br />
              <span className="text-white">of Your Ideas</span>
            </h1>

            <p className="text-xl max-w-4xl font-semibold text-slate-200/80 mb-12 leading-relaxed ">
              Welcome to Prompt Engine, the ultimate hub for AI prompt
              engineering. In a world powered by artificial intelligence, the
              quality of your output is determined by the quality of your input.
            </p>
          </div>

          {/* Our Mission Section */}
          <div className="sm:p-20 p-10 grid sm:grid-cols-2 gap-x-20 mx-auto bg-gradient-to-br from-slate-950/10 via-slate-900/10 to-slate-950/10">
            <span>
              <div className=" mb-4 text-5xl flex items-center sm:justify-start justify-center font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Our Mission
              </div>
              <p className="text-xl sm:text-start  text-slate-300 mb-8 leading-relaxed max-w-4xl">
                Our mission is to empower creators, developers, and innovators
                like you to craft the perfect prompts for any AI model. We saw a
                need for a centralized space where the art of prompt writing
                could be practiced, shared, and perfected.
              </p>
            </span>
            {/* Mission Cards */}

            <div className="bg-slate-800/50 lg:flex items-center justify-around border border-slate-600/50 rounded-2xl p-8 text-center hover:bg-slate-700/50 transition-all duration-200">
              <span className="p-2">
                <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/30">
                  <Rocket className="text-cyan-400" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Innovation
                </h3>
                <p className="text-slate-400">Pushing boundaries</p>
              </span>
              <span className="p-2">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
                  <Users className="text-emerald-400" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Community
                </h3>
                <p className="text-slate-400">Building together</p>
              </span>
            </div>
          </div>

          {/* What You Can Do Here Section */}
          <div className="px-8 py-20 bg-slate-800/30">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-cyan-400 mb-6">
                What You Can Do Here
              </h2>
              <p className="text-xl text-slate-300 mb-16 max-w-3xl mx-auto">
                Prompt Engine is more than just a library; it's a complete
                toolkit for your creative workflow.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-slate-800/60 border border-slate-600/50 rounded-2xl p-8 hover:bg-slate-700/50 transition-all duration-200">
                  <div className="w-16 h-16 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 border border-cyan-500/30">
                    <Edit className="text-cyan-400" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Create & Innovate
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    Build powerful, detailed prompts from scratch with an editor
                    and share it with others and also edit the prompts you
                    posted.
                  </p>
                </div>

                <div className="bg-slate-800/60 border border-slate-600/50 rounded-2xl p-8 hover:bg-slate-700/50 transition-all duration-200">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
                    <Search className="text-emerald-400" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Search & Discover
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    Explore a vast, community-driven database of prompts for any
                    purpose. Find inspiration and discover new ways to
                    communicate with AI.
                  </p>
                </div>

                <div className="bg-slate-800/60 border border-slate-600/50 rounded-2xl p-8 hover:bg-slate-700/50 transition-all duration-200">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 border border-blue-500/30">
                    <Copy className="text-blue-400" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Copy & Deploy
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    Found the perfect prompt? Copy it with a single click and
                    paste it directly into your favorite AI model to see it in
                    action.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Who We're For Section */}
          <div className="px-8 py-20 max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-cyan-400 mb-6">
                Who We're For
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                This platform is built for anyone who interacts with AI
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-800/40 text-start border border-slate-600/50 rounded-2xl p-6 hover:bg-slate-700/40 transition-all duration-200">
                <div className="w-12 h-12 bg-slate-700/50 rounded-lg flex items-center justify-center mb-4 border border-slate-600/50">
                  <Code className="text-cyan-400" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Developers
                </h3>
                <p className="text-slate-400 text-sm">
                  Building AI-powered applications
                </p>
              </div>

              <div className="bg-slate-800/40 border text-start border-slate-600/50 rounded-2xl p-6 hover:bg-slate-700/40 transition-all duration-200">
                <div className="w-12 h-12 bg-slate-700/50 rounded-lg flex items-center justify-center mb-4 border border-slate-600/50">
                  <Briefcase className="text-orange-400" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Marketers</h3>
                <p className="text-slate-400 text-sm">
                  Crafting compelling campaign copy
                </p>
              </div>

              <div className="bg-slate-800/40 border text-start border-slate-600/50 rounded-2xl p-6 hover:bg-slate-700/40 transition-all duration-200">
                <div className="w-12 h-12 bg-slate-700/50 rounded-lg flex items-center justify-center mb-4 border border-slate-600/50">
                  <Palette className="text-green-400" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Artists & Designers
                </h3>
                <p className="text-slate-400 text-sm">
                  Generating visual concepts
                </p>
              </div>

              <div className="bg-slate-800/40 border text-start border-slate-600/50 rounded-2xl p-6 hover:bg-slate-700/40 transition-all duration-200">
                <div className="w-12 h-12 bg-slate-700/50 rounded-lg flex items-center justify-center mb-4 border border-slate-600/50">
                  <CheckCircle className="text-emerald-400" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Writers & Creators
                </h3>
                <p className="text-slate-400 text-sm">
                  Looking for inspiration or generating text
                </p>
              </div>

              <div className="bg-slate-800/40 border text-start border-slate-600/50 rounded-2xl p-6 hover:bg-slate-700/40 transition-all duration-200">
                <div className="w-12 h-12 bg-slate-700/50 rounded-lg flex items-center justify-center mb-4 border border-slate-600/50">
                  <GraduationCap className="text-blue-400" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Students & Researchers
                </h3>
                <p className="text-slate-400 text-sm">
                  Exploring complex topics
                </p>
              </div>

              <div className="bg-slate-800/40 border text-start border-slate-600/50 rounded-2xl p-6 hover:bg-slate-700/40 transition-all duration-200">
                <div className="w-12 h-12 bg-slate-700/50 rounded-lg flex items-center justify-center mb-4 border border-slate-600/50">
                  <Lightbulb className="text-yellow-400" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Curious Minds
                </h3>
                <p className="text-slate-400 text-sm">
                  Exploring AI capabilities
                </p>
              </div>

              {/* Empty third column for layout balance */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PromptEngineHomepage;
