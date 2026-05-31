/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Terminal from "./components/Terminal";
import CodeExplorer from "./components/CodeExplorer";
import UMLDiagram from "./components/UMLDiagram";
import Documentation from "./components/Documentation";
import { Terminal as TerminalIcon, FileCode, Landmark as UmlIcon, BookOpen, Sparkles, FolderOpen, AlertCircle, PlayCircle } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"terminal" | "code" | "uml" | "docs">("terminal");

  const stats = [
    { label: "OOP Concepts", value: "6 Formats", desc: "Classes, Inheritance, Polymorphism" },
    { label: "Java Classes", value: "11 Files", desc: "Fully annotated & compile-green" },
    { label: "Database Engine", value: "Memory Pools", desc: "Collection-backed indices" },
    { label: "Persistence", value: "Serialization", desc: "Robust backup to .ser files" }
  ];

  return (
    <div className="min-h-screen bg-[#FCFCFA] text-[#1C1C1A] flex flex-col font-sans antialiased relative selection:bg-[#B88E2F] selection:text-white">
      {/* Decorative luxury hairline accent */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#B88E2F]/40 to-transparent pointer-events-none"></div>

      {/* Luxury Navigation Header */}
      <header className="border-b border-black/10 bg-[#FCFCFA]/90 backdrop-blur-md sticky top-0 z-30 shrink-0">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Elegant rotating gold brand mark */}
            <div className="w-10 h-10 bg-[#B88E2F] flex items-center justify-center rounded-sm rotate-45 shadow-sm select-none">
              <div className="-rotate-45 font-bold text-white text-xl font-serif">C</div>
            </div>
            <div>
              <h1 className="text-xl font-serif italic tracking-[0.15em] uppercase text-[#1C1C1A] leading-tight">
                Cinétique Royale
              </h1>
              <span className="text-[10px] text-black/50 block font-mono tracking-widest uppercase mt-0.5">
                Cineplex Java Core SDK Sandbox
              </span>
            </div>
          </div>

          {/* Luxury Status Badge */}
          <div className="flex items-center gap-2.5 px-4 py-1.5 border border-[#B88E2F]/30 bg-[#FFFFFF] rounded-none shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B88E2F] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B88E2F]"></span>
            </span>
            <span className="text-[10px] font-mono font-bold text-[#B88E2F] tracking-[0.2em] uppercase">
              System Online
            </span>
          </div>
        </div>
      </header>

      {/* Core Layout Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8 flex flex-col gap-8">
        
        {/* Cinematic Intro Banner */}
        <section className="relative overflow-hidden border border-black/10 bg-[#FFFFFF] p-8 md:p-10 flex flex-col lg:flex-row gap-8 justify-between items-start lg:items-center shadow-sm">
          {/* Faded background giant watermark */}
          <div className="absolute right-0 bottom-0 pointer-events-none opacity-[0.03] transform translate-x-12 translate-y-12 select-none font-serif italic text-black text-[180px] leading-none">
            Gilded
          </div>

          <div className="flex-1 space-y-4">
            <div className="inline-block bg-[#B88E2F] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-[0.2em]">
              Cinema Ticketing Sandbox
            </div>
            <h2 className="text-3xl md:text-4xl font-serif italic text-black tracking-wide">
              Echoes of the Gilded Age
            </h2>
            <p className="text-xs md:text-sm text-black/60 max-w-2xl leading-relaxed">
              An educational blueprint of an enterprise-grade cinema box office system, written entirely in compliant Core Java OOP. Observe beautiful modular class relation models, compile-clean serialization buffers, and interact with the executable Java Shell simulator in real-time.
            </p>
          </div>

          {/* Stats overview in bento-theme */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:flex gap-4 shrink-0 w-full lg:w-auto pt-6 lg:pt-0 border-t lg:border-t-0 border-black/10">
            {stats.map((st) => (
              <div key={st.label} className="bg-[#FAF9F5] border border-black/5 hover:border-[#B88E2F]/30 transition-all duration-350 p-4 min-w-[145px]">
                <span className="text-[9px] text-[#B88E2F] block uppercase font-bold tracking-[0.15em]">{st.label}</span>
                <span className="text-base font-serif italic text-black block mt-1">{st.value}</span>
                <span className="text-[10px] text-black/50 block leading-normal mt-1">{st.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Tab Navigator with Custom Slate/Gold Buttons */}
        <div className="flex flex-wrap bg-[#FFFFFF] border border-black/10 p-1 self-start gap-1 shadow-sm">
          <button
            onClick={() => setActiveTab("terminal")}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-[0.15em] transition-all cursor-pointer ${
              activeTab === "terminal"
                ? "bg-[#B88E2F] text-white font-bold"
                : "text-black/60 hover:text-black hover:bg-black/5"
            }`}
          >
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>Interactive Terminal</span>
          </button>
          
          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-[0.15em] transition-all cursor-pointer ${
              activeTab === "code"
                ? "bg-[#B88E2F] text-white font-bold"
                : "text-black/60 hover:text-black hover:bg-black/5"
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Java Source-Code</span>
          </button>

          <button
            onClick={() => setActiveTab("uml")}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-[0.15em] transition-all cursor-pointer ${
              activeTab === "uml"
                ? "bg-[#B88E2F] text-white font-bold"
                : "text-black/60 hover:text-black hover:bg-black/5"
            }`}
          >
            <UmlIcon className="w-3.5 h-3.5" />
            <span>UML Layouts</span>
          </button>

          <button
            onClick={() => setActiveTab("docs")}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-[0.15em] transition-all cursor-pointer ${
              activeTab === "docs"
                ? "bg-[#B88E2F] text-white font-bold"
                : "text-black/60 hover:text-black hover:bg-black/5"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Architecture Guide</span>
          </button>
        </div>

        {/* Active View Area with elegant fade transition attributes */}
        <div className="flex-1 min-h-[500px]">
          {activeTab === "terminal" && <Terminal />}
          {activeTab === "code" && <CodeExplorer />}
          {activeTab === "uml" && <UMLDiagram />}
          {activeTab === "docs" && <Documentation />}
        </div>
      </main>

      {/* Premium Footer */}
      <footer className="border-t border-black/10 bg-[#FFFFFF] py-8 mt-16 shrink-0 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-mono text-black/50 uppercase tracking-[0.2em]">
          <div className="flex items-center gap-2">
            <span>© 2026 Cinétique Royale</span>
            <span className="text-black/10">•</span>
            <span>Target Platform: Standard JDK 17 / 21 SE</span>
          </div>
          <div className="flex items-center gap-1.5 text-black/30">
            <span>Enterprise Class Blueprint Spec v1.5</span>
            <span className="text-black/10">•</span>
            <span className="text-[#B88E2F] font-semibold">Zero Dependencies Sandbox</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
