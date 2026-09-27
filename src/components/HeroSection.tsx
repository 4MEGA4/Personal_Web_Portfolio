"use client";

import { useState } from "react";
import { soundFx } from "@/lib/audio";
import { 
  PILOT_PROFILE, 
  ANIME_LOGS, 
  HOBBIES, 
  ACHIEVEMENTS, 
  RANDOM_FACTS, 
  FactItem 
} from "@/data/portfolioData";
import confetti from "canvas-confetti";
import { 
  Rocket, 
  Terminal, 
  ChevronRight, 
  Sparkles, 
  Dice5, 
  Code2, 
  Gamepad2,
  Headphones, 
  Cpu
} from "lucide-react";

interface HeroSectionProps {
  onNavigate: (view: "hero" | "projects" | "comms") => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  // Pilot Dossier Deck Tab state
  const [dossierTab, setDossierTab] = useState<"bio" | "anime" | "hobbies" | "achievements">("bio");

  // Random Lore Fact Generator state
  const [factIndex, setFactIndex] = useState(0);
  const [currentFact, setCurrentFact] = useState<FactItem>(RANDOM_FACTS[0]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.75 },
        colors: ["#ffffff", "#e5e5e5", "#a3a3a3", "#000000"],
      });
    } catch {
      // Fallback
    }
  };

  const drawNextFact = () => {
    soundFx.playConfirm();
    triggerConfetti();
    const nextIdx = (factIndex + 1) % RANDOM_FACTS.length;
    setFactIndex(nextIdx);
    setCurrentFact(RANDOM_FACTS[nextIdx]);
  };

  const getHobbyIcon = (iconName: string) => {
    switch (iconName) {
      case "Code2":
        return <Code2 className="w-4 h-4 text-white" />;
      case "Gamepad2":
        return <Gamepad2 className="w-4 h-4 text-white" />;
      case "Headphones":
        return <Headphones className="w-4 h-4 text-white" />;
      case "Cpu":
        return <Cpu className="w-4 h-4 text-white" />;
      default:
        return <Sparkles className="w-4 h-4 text-white" />;
    }
  };

  return (
    <section 
      id="hero" 
      className="relative flex-1 flex flex-col justify-between py-2 sm:py-3 overflow-y-auto md:overflow-hidden z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col justify-between gap-2.5 sm:gap-3.5">
        
        {/* TOP / UPPER AREA: Clean Headline */}
        <div className="pt-0.5 sm:pt-1">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white leading-none">
            HELLO, I&apos;M {PILOT_PROFILE.callsign}
          </h1>
        </div>

        {/* MIDDLE / CENTER AREA: Side Action Navigation Dock on Left & Interactive Pilot Dossier Deck on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-5 items-start">
          
          {/* Side Action Navigation Dock (Left 4 cols on desktop) */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-2.5">
            <div className="text-xs font-tech text-neutral-400 font-bold uppercase tracking-wider flex items-center gap-2">
              <span>ORBITAL DISPATCH // FLIGHT SECTORS</span>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 sm:gap-2.5">
              {/* Primary Action Button -> Projects */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  onNavigate("projects");
                }}
                onMouseEnter={() => soundFx.playHover()}
                className="group w-full b-btn-white font-tech font-black text-xs sm:text-sm tracking-wider flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <Rocket className="w-4 h-4 text-black group-hover:text-white transition-all" />
                  <span>INITIALIZE MISSIONS</span>
                </div>
                <ChevronRight className="w-4 h-4 text-black group-hover:text-white transition-all" />
              </button>

              {/* Direct Comms Button -> Comms */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  onNavigate("comms");
                }}
                onMouseEnter={() => soundFx.playHover()}
                className="group w-full b-btn-dark font-tech font-black text-xs sm:text-sm tracking-wider flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-none bg-white group-hover:bg-black transition-colors" />
                  <span>DIRECT COMMS</span>
                </div>
                <ChevronRight className="w-4 h-4 text-white group-hover:text-black transition-all" />
              </button>
            </div>

            {/* Quick Specs Callout */}
            <div className="p-2.5 b-card font-tech text-xs space-y-1 hidden lg:block">
              <div className="text-neutral-400 font-bold uppercase text-[10px]">CURRENT OBJECTIVE</div>
              <p className="text-neutral-200 text-xs font-medium leading-snug font-sans">
                {PILOT_PROFILE.currentObjective}
              </p>
            </div>
          </div>

          {/* Right: Interactive Pilot Dossier Deck (Right 8 cols on desktop) */}
          <div className="lg:col-span-8">
            <div className="b-card flex flex-col">
              
              {/* Dossier Deck Tabs Header */}
              <div className="p-2.5 bg-black border-b-2 border-white flex flex-wrap items-center justify-between gap-1.5 font-tech text-xs">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Terminal className="w-4 h-4 text-white" />
                  <span className="hidden sm:inline">PILOT_DOSSIER_DECK</span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setDossierTab("bio");
                    }}
                    onMouseEnter={() => soundFx.playHover()}
                    className={`px-2.5 py-1 font-tech text-xs font-bold transition-all cursor-pointer border-2 ${
                      dossierTab === "bio"
                        ? "bg-white text-black border-white shadow-[2px_2px_0px_#ffffff]"
                        : "bg-[#121212] hover:bg-black text-white border-[#262626] hover:border-white"
                    }`}
                  >
                    01_BIO & SPECS
                  </button>

                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setDossierTab("anime");
                    }}
                    onMouseEnter={() => soundFx.playHover()}
                    className={`px-2.5 py-1 font-tech text-xs font-bold transition-all cursor-pointer border-2 ${
                      dossierTab === "anime"
                        ? "bg-white text-black border-white shadow-[2px_2px_0px_#ffffff]"
                        : "bg-[#121212] hover:bg-black text-white border-[#262626] hover:border-white"
                    }`}
                  >
                    02_ANIME_ARCHIVE
                  </button>

                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setDossierTab("hobbies");
                    }}
                    onMouseEnter={() => soundFx.playHover()}
                    className={`px-2.5 py-1 font-tech text-xs font-bold transition-all cursor-pointer border-2 ${
                      dossierTab === "hobbies"
                        ? "bg-white text-black border-white shadow-[2px_2px_0px_#ffffff]"
                        : "bg-[#121212] hover:bg-black text-white border-[#262626] hover:border-white"
                    }`}
                  >
                    03_HOBBIES
                  </button>

                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setDossierTab("achievements");
                    }}
                    onMouseEnter={() => soundFx.playHover()}
                    className={`px-2.5 py-1 font-tech text-xs font-bold transition-all cursor-pointer border-2 ${
                      dossierTab === "achievements"
                        ? "bg-white text-black border-white shadow-[2px_2px_0px_#ffffff]"
                        : "bg-[#121212] hover:bg-black text-white border-[#262626] hover:border-white"
                    }`}
                  >
                    04_ACHIEVEMENTS
                  </button>
                </div>
              </div>

              {/* Dossier Content Body */}
              <div className="p-3.5 sm:p-5 bg-[#121212] min-h-[220px] md:min-h-[235px] flex flex-col justify-between">
                
                {/* TAB 1: BIO & SPECS */}
                {dossierTab === "bio" && (
                  <div className="space-y-3 animate-in fade-in duration-150">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[#262626] pb-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-11 h-11 sm:w-12 sm:h-12 b-card-dark flex items-center justify-center overflow-hidden shrink-0">
                          <span className="font-serif font-black text-lg sm:text-xl text-white">
                            [ID]
                          </span>
                        </div>
                        <div>
                          <div className="text-sm sm:text-base font-serif font-black text-white">{PILOT_PROFILE.fullName}</div>
                          <div className="text-xs font-tech text-neutral-300">{PILOT_PROFILE.role}</div>
                          <div className="text-[10px] font-tech text-neutral-400">LOC: {PILOT_PROFILE.location}</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs font-tech">
                        <span className="b-tag">
                          {PILOT_PROFILE.status}
                        </span>
                        <span className="b-tag bg-white text-black font-bold">
                          {PILOT_PROFILE.flightHours}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                      {PILOT_PROFILE.bio}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs font-tech">
                      <div className="p-2 bg-black border border-white">
                        <span className="text-neutral-400 text-[10px] block">FRONTEND SYNCHRO</span>
                        <span className="text-white font-bold">96% OUTPUT</span>
                      </div>
                      <div className="p-2 bg-black border border-white">
                        <span className="text-neutral-400 text-[10px] block">REACTOR CORE</span>
                        <span className="text-white font-bold">88% POWER</span>
                      </div>
                      <div className="p-2 bg-black border border-white">
                        <span className="text-neutral-400 text-[10px] block">AVIONICS TELEMETRY</span>
                        <span className="text-white font-bold">92% STABLE</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: ANIME INSPIRATIONS */}
                {dossierTab === "anime" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 animate-in fade-in duration-150">
                    {ANIME_LOGS.map((anime) => (
                      <div
                        key={anime.id}
                        className="p-2.5 bg-black border-2 border-[#262626] hover:border-white space-y-1 shadow-[3px_3px_0px_#262626] hover:shadow-[3px_3px_0px_#ffffff] transition-all"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-bold text-white truncate">{anime.title}</span>
                          <span className="b-tag text-[9px] font-bold bg-white text-black shrink-0">
                            {anime.rating}
                          </span>
                        </div>
                        <p className="text-[11px] font-tech text-neutral-300 italic line-clamp-1">
                          &quot;{anime.quote}&quot;
                        </p>
                        <p className="text-[10px] text-neutral-400 line-clamp-1 font-sans">{anime.vibe}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 3: HOBBIES & PASSION */}
                {dossierTab === "hobbies" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 animate-in fade-in duration-150">
                    {HOBBIES.map((hobby) => (
                      <div
                        key={hobby.id}
                        className="p-2.5 bg-black border-2 border-[#262626] hover:border-white space-y-1 shadow-[3px_3px_0px_#262626] hover:shadow-[3px_3px_0px_#ffffff] transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-[#121212] border border-white text-white">
                            {getHobbyIcon(hobby.icon)}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">{hobby.name}</div>
                            <div className="text-[10px] font-tech text-neutral-300">{hobby.stats}</div>
                          </div>
                        </div>
                        <p className="text-[10px] text-neutral-400 line-clamp-1 font-sans">{hobby.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 4: ACHIEVEMENTS */}
                {dossierTab === "achievements" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 animate-in fade-in duration-150">
                    {ACHIEVEMENTS.map((ach) => (
                      <div
                        key={ach.id}
                        className="p-2.5 bg-black border-2 border-[#262626] hover:border-white space-y-1 shadow-[3px_3px_0px_#262626] hover:shadow-[3px_3px_0px_#ffffff] transition-all"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-tech text-neutral-400 font-bold">
                            {ach.year}{" // "}{ach.organization}
                          </span>
                          <span className="b-tag text-[9px] font-bold bg-white text-black">
                            {ach.badgeText}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-white">{ach.title}</div>
                        <p className="text-[10px] text-neutral-400 line-clamp-1 font-sans">{ach.description}</p>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM / LOWER AREA: Random Facts & Lore Generator Card */}
        <div className="p-2.5 sm:p-3 b-card flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 font-tech text-xs">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 b-card-dark text-white shrink-0">
              <Dice5 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold uppercase text-[10px]">
                  TELEMETRY LORE #{currentFact.id}{" // "}{currentFact.rarity}
                </span>
                <span className="text-neutral-600">•</span>
                <span className="text-neutral-400 text-[10px]">{currentFact.category}</span>
              </div>
              <p className="text-neutral-200 text-xs italic mt-0.5">
                &quot;{currentFact.fact}&quot;
              </p>
            </div>
          </div>

          <button
            onClick={drawNextFact}
            onMouseEnter={() => soundFx.playHover()}
            className="b-btn-white font-tech font-bold text-xs flex items-center gap-1.5 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-black hover:text-white" />
            <span>ROLL NEXT FACT</span>
          </button>
        </div>

      </div>
    </section>
  );
}
