"use client";

import { useState } from "react";
import StarfieldCanvas from "@/components/StarfieldCanvas";
import HudHeader, { ActiveView } from "@/components/HudHeader";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CommandTerminal from "@/components/CommandTerminal";

export default function Home() {
  const [activeView, setActiveView] = useState<ActiveView>("hero");
  const [terminalOpen, setTerminalOpen] = useState(false);

  const handleNavigate = (view: ActiveView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen md:h-screen md:overflow-hidden bg-black text-white selection:bg-white selection:text-black flex flex-col justify-between">
      {/* 60 FPS Interactive Starfield Canvas & Warp Accelerator (Scroll & Wheel enabled) */}
      <StarfieldCanvas />

      {/* Cockpit HUD Top Bar Navigation with Active View Switcher */}
      <HudHeader
        activeView={activeView}
        onSelectView={handleNavigate}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* Dynamic View Screen Replacement Content */}
      <div className="relative z-10 flex-1 flex flex-col min-h-0">
        {activeView === "hero" && (
          <div className="animate-in fade-in zoom-in-95 duration-200 flex-1 flex flex-col min-h-0">
            <HeroSection onNavigate={handleNavigate} />
          </div>
        )}

        {activeView === "projects" && (
          <div className="animate-in fade-in zoom-in-95 duration-200 overflow-y-auto flex-1">
            <ProjectsSection onBack={() => handleNavigate("hero")} />
          </div>
        )}

        {activeView === "comms" && (
          <div className="animate-in fade-in zoom-in-95 duration-200 overflow-y-auto flex-1">
            <ContactSection onBack={() => handleNavigate("hero")} />
          </div>
        )}
      </div>

      {/* Global Cockpit Footer */}
      <Footer onBackToHome={() => handleNavigate("hero")} />

      {/* Interactive HUD Command Terminal Easter Egg */}
      <CommandTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </main>
  );
}
