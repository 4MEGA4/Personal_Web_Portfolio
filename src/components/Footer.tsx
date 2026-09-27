"use client";

import { soundFx } from "@/lib/audio";
import { PILOT_PROFILE } from "@/data/portfolioData";
import { ArrowUp } from "lucide-react";

interface FooterProps {
  onBackToHome?: () => void;
}

export default function Footer({ onBackToHome }: FooterProps) {
  const scrollToTop = () => {
    soundFx.playConfirm();
    if (onBackToHome) {
      onBackToHome();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t-2 border-white bg-black py-2 px-4 sm:px-6 relative z-10 font-tech text-xs text-neutral-400">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Telemetry: Coordinates */}
        <div className="text-white font-tech text-xs font-bold tracking-wider">
          SECTOR: {PILOT_PROFILE.coordinates}
        </div>

        {/* Right: Compact Scroll Back to Orbit Button */}
        <button
          onClick={scrollToTop}
          onMouseEnter={() => soundFx.playHover()}
          className="b-btn-white text-xs flex items-center gap-1.5 py-1 px-3 shadow-[2px_2px_0px_#ffffff]"
        >
          <span>BACK_TO_ORBIT</span>
          <ArrowUp className="w-3.5 h-3.5 text-black group-hover:text-white transition-colors" />
        </button>
      </div>
    </footer>
  );
}
