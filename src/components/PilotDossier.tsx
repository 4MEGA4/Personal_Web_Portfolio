"use client";

import { useState } from "react";
import { soundFx } from "@/lib/audio";
import { 
  ANIME_LOGS, 
  HOBBIES, 
  RANDOM_FACTS, 
  ACHIEVEMENTS, 
  FactItem 
} from "@/data/portfolioData";
import confetti from "canvas-confetti";
import { 
  Tv, 
  Gamepad2, 
  Sparkles, 
  Trophy, 
  Dice5, 
  Quote, 
  Code2, 
  Headphones, 
  Cpu, 
  CheckCircle,
  Radio
} from "lucide-react";

export default function PilotDossier() {
  const [activeTab, setActiveTab] = useState<"anime" | "hobbies" | "facts" | "achievements">("anime");
  const [currentFact, setCurrentFact] = useState<FactItem>(RANDOM_FACTS[0]);
  const [factIndex, setFactIndex] = useState(0);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#ffffff", "#e5e5e5", "#a3a3a3", "#000000"],
      });
    } catch {
      // Confetti fallback
    }
  };

  const drawNextFact = () => {
    soundFx.playConfirm();
    triggerConfetti();
    const nextIdx = (factIndex + 1) % RANDOM_FACTS.length;
    setFactIndex(nextIdx);
    setCurrentFact(RANDOM_FACTS[nextIdx]);
  };

  const getRarityBadge = (rarity: FactItem["rarity"]) => {
    switch (rarity) {
      case "LEGENDARY":
        return "bg-white text-black font-bold font-tech border-2 border-white shadow-[2px_2px_0px_#ffffff]";
      case "RARE":
        return "bg-[#262626] text-white font-bold font-tech border-2 border-[#a3a3a3]";
      default:
        return "bg-black text-white font-bold font-tech border-2 border-white";
    }
  };

  const getHobbyIcon = (iconName: string) => {
    switch (iconName) {
      case "Code2":
        return <Code2 className="w-5 h-5 text-white" />;
      case "Gamepad2":
        return <Gamepad2 className="w-5 h-5 text-white" />;
      case "Headphones":
        return <Headphones className="w-5 h-5 text-white" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-white" />;
      default:
        return <Sparkles className="w-5 h-5 text-white" />;
    }
  };

  return (
    <section id="dossier" className="py-24 relative z-10 border-t-2 border-white bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-black border-2 border-white font-tech text-xs text-white shadow-[2px_2px_0px_#ffffff]">
            <Radio className="w-3.5 h-3.5 text-white" />
            <span>PILOT LOGS // SECTOR_04</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-white tracking-tight">
            PILOT DOSSIER
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl font-sans">
            Personal interests, aesthetic blueprints, milestone achievements, and random lore that power my engineering drive.
          </p>
        </div>

        {/* Dossier Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b-2 border-white pb-4">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab("anime");
            }}
            onMouseEnter={() => soundFx.playHover()}
            className={`flex items-center gap-2 px-4 py-2.5 font-tech text-xs tracking-wider border-2 transition-all cursor-pointer ${
              activeTab === "anime"
                ? "bg-white text-black font-bold border-white shadow-[3px_3px_0px_#ffffff]"
                : "bg-[#121212] hover:bg-[#262626] border-[#262626] hover:border-white text-white shadow-[3px_3px_0px_#262626] hover:shadow-[3px_3px_0px_#ffffff]"
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span>01_ANIME_ARCHIVE</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab("hobbies");
            }}
            onMouseEnter={() => soundFx.playHover()}
            className={`flex items-center gap-2 px-4 py-2.5 font-tech text-xs tracking-wider border-2 transition-all cursor-pointer ${
              activeTab === "hobbies"
                ? "bg-white text-black font-bold border-white shadow-[3px_3px_0px_#ffffff]"
                : "bg-[#121212] hover:bg-[#262626] border-[#262626] hover:border-white text-white shadow-[3px_3px_0px_#262626] hover:shadow-[3px_3px_0px_#ffffff]"
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>02_HOBBIES_&_PASSION</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab("facts");
            }}
            onMouseEnter={() => soundFx.playHover()}
            className={`flex items-center gap-2 px-4 py-2.5 font-tech text-xs tracking-wider border-2 transition-all cursor-pointer ${
              activeTab === "facts"
                ? "bg-white text-black font-bold border-white shadow-[3px_3px_0px_#ffffff]"
                : "bg-[#121212] hover:bg-[#262626] border-[#262626] hover:border-white text-white shadow-[3px_3px_0px_#262626] hover:shadow-[3px_3px_0px_#ffffff]"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>03_RANDOM_FACTS_LORE</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab("achievements");
            }}
            onMouseEnter={() => soundFx.playHover()}
            className={`flex items-center gap-2 px-4 py-2.5 font-tech text-xs tracking-wider border-2 transition-all cursor-pointer ${
              activeTab === "achievements"
                ? "bg-white text-black font-bold border-white shadow-[3px_3px_0px_#ffffff]"
                : "bg-[#121212] hover:bg-[#262626] border-[#262626] hover:border-white text-white shadow-[3px_3px_0px_#262626] hover:shadow-[3px_3px_0px_#ffffff]"
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>04_ACHIEVEMENTS</span>
          </button>
        </div>

        {/* TAB 1: ANIME ARCHIVE */}
        {activeTab === "anime" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ANIME_LOGS.map((anime) => (
              <div
                key={anime.id}
                className="bg-[#121212] p-6 border-2 border-white space-y-4 hover:shadow-[6px_6px_0px_#ffffff] transition-all duration-150 group shadow-[4px_4px_0px_#ffffff]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-tech text-neutral-400 font-bold tracking-widest block">
                      {anime.jpTitle}
                    </span>
                    <h3 className="text-xl font-serif font-black text-white group-hover:text-neutral-300 transition-colors">
                      {anime.title}
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 text-[10px] font-tech font-bold bg-white text-black border border-white shrink-0 shadow-[2px_2px_0px_#ffffff]">
                    {anime.rating}
                  </span>
                </div>

                <div className="p-3 bg-black border border-white font-tech text-xs text-neutral-200 italic flex items-start gap-2">
                  <Quote className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <span>&quot;{anime.quote}&quot;</span>
                </div>

                <div className="text-xs text-neutral-300 space-y-1 font-sans">
                  <span className="text-neutral-400 font-tech font-bold block">INFLUENCE & VIBE:</span>
                  <p>{anime.vibe}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {anime.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-black border border-[#262626] text-neutral-400 text-[11px] font-tech"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: HOBBIES & PASSION */}
        {activeTab === "hobbies" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {HOBBIES.map((hobby) => (
              <div
                key={hobby.id}
                className="bg-[#121212] p-6 border-2 border-white space-y-4 hover:shadow-[6px_6px_0px_#ffffff] transition-all duration-150 shadow-[4px_4px_0px_#ffffff]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-black border-2 border-white text-white shadow-[2px_2px_0px_#ffffff]">
                    {getHobbyIcon(hobby.icon)}
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-white">{hobby.name}</h3>
                    <p className="text-xs font-tech text-neutral-300">{hobby.subtitle}</p>
                  </div>
                </div>

                <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                  {hobby.description}
                </p>

                <div className="pt-2 border-t-2 border-[#262626] flex flex-wrap items-center justify-between text-xs font-tech text-neutral-400 gap-2">
                  <span className="text-white font-bold">{hobby.stats}</span>
                  {hobby.favoriteGear && (
                    <span className="text-neutral-400">Gear: {hobby.favoriteGear}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: RANDOM FACTS LORE */}
        {activeTab === "facts" && (
          <div className="max-w-2xl mx-auto bg-[#121212] p-8 border-2 border-white space-y-6 text-center shadow-[6px_6px_0px_#ffffff]">
            <div className="flex justify-center">
              <span className={`px-3 py-1 text-xs font-tech font-bold ${getRarityBadge(currentFact.rarity)}`}>
                RARITY: {currentFact.rarity}{" // "}#{currentFact.id}
              </span>
            </div>

            <div className="min-h-[90px] flex items-center justify-center">
              <p className="text-lg sm:text-xl font-medium text-white italic leading-relaxed font-sans">
                &quot;{currentFact.fact}&quot;
              </p>
            </div>

            <div className="pt-4 border-t-2 border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4 font-tech">
              <span className="text-xs text-neutral-400 font-bold">
                CATEGORY: {currentFact.category}
              </span>

              <button
                onClick={drawNextFact}
                onMouseEnter={() => soundFx.playHover()}
                className="group px-5 py-2.5 bg-white hover:bg-black text-black hover:text-white font-tech font-bold text-xs tracking-wider flex items-center gap-2 border-2 border-white shadow-[3px_3px_0px_#ffffff] hover:shadow-[1px_1px_0px_#ffffff] transition-all cursor-pointer"
              >
                <Dice5 className="w-4 h-4 text-black group-hover:text-white transition-colors" />
                <span>ROLL NEXT FACT</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: ACHIEVEMENTS */}
        {activeTab === "achievements" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ACHIEVEMENTS.map((ach) => (
              <div
                key={ach.id}
                className="bg-[#121212] p-6 border-2 border-white space-y-3 hover:shadow-[6px_6px_0px_#ffffff] transition-all duration-150 shadow-[4px_4px_0px_#ffffff]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-xs font-tech text-neutral-400 font-bold">
                      {ach.year}{" // "}{ach.organization}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-white">{ach.title}</h3>
                  </div>
                  <span className="px-2.5 py-0.5 text-[10px] font-tech font-bold bg-white text-black border border-white shrink-0 shadow-[2px_2px_0px_#ffffff]">
                    {ach.badgeText}
                  </span>
                </div>

                <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                  {ach.description}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs font-tech text-white font-bold">
                  <CheckCircle className="w-3.5 h-3.5 text-white" />
                  <span>VERIFIED RECORD ON TELEMETRY LEDGER</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
