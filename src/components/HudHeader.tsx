"use client";

import { useEffect, useState } from "react";
import { soundFx } from "@/lib/audio";
import { Volume2, VolumeX, Terminal as TerminalIcon, Menu, X, Activity } from "lucide-react";

export type ActiveView = "hero" | "projects" | "comms";

interface HudHeaderProps {
  activeView: ActiveView;
  onSelectView: (view: ActiveView) => void;
  onOpenTerminal: () => void;
}

export default function HudHeader({ activeView, onSelectView, onOpenTerminal }: HudHeaderProps) {
  const [sfxEnabled, setSfxEnabled] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utc = now.toUTCString().split(" ")[4];
      setCurrentTime(`${utc} UTC`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleAudio = () => {
    const enabled = soundFx.toggle();
    setSfxEnabled(enabled);
  };

  const navItems: { label: string; view: ActiveView }[] = [
    { label: "01_HERO", view: "hero" },
    { label: "02_PROJECTS", view: "projects" },
    { label: "03_DIRECT_COMMS", view: "comms" },
  ];

  const handleNavClick = (view: ActiveView) => {
    soundFx.playClick();
    setMobileMenuOpen(false);
    onSelectView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-150 bg-[#000000] border-b-2 border-white ${
        scrolled ? "py-2.5 shadow-[0_4px_0px_#262626]" : "py-3.5 shadow-[0_4px_0px_#262626]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Live UTC Clock Readout on Left */}
        <div className="flex items-center font-tech text-xs tracking-wider text-white">
          <span className="b-card-dark px-2.5 py-1 font-bold text-xs">
            {currentTime || "SYNCING..."}
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = activeView === item.view;
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.view)}
                onMouseEnter={() => soundFx.playHover()}
                className={`text-xs font-tech flex items-center justify-center ${
                  isActive
                    ? "b-btn-white py-1 px-3"
                    : "b-btn-dark py-1 px-3"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls (Audio, Terminal, Mobile Toggle) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* SFX Audio Engine Toggle */}
          <button
            onClick={toggleAudio}
            onMouseEnter={() => soundFx.playHover()}
            title={sfxEnabled ? "Audio Synthesizer: ON (Click to Mute)" : "Audio Synthesizer: OFF (Click to Enable)"}
            className={`group font-tech text-xs flex items-center gap-1.5 ${
              sfxEnabled
                ? "b-btn-white py-1 px-2.5"
                : "b-btn-dark py-1 px-2.5"
            }`}
          >
            {sfxEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-black transition-colors" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-white group-hover:text-black transition-colors" />
            )}
            <span className="hidden sm:inline text-[11px] font-bold">{sfxEnabled ? "SFX:ON" : "SFX:OFF"}</span>
          </button>

          {/* Quick HUD Terminal Command Trigger */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenTerminal();
            }}
            onMouseEnter={() => soundFx.playHover()}
            className="b-btn-white py-1 px-2.5 font-tech text-xs flex items-center gap-1.5"
          >
            <TerminalIcon className="w-3.5 h-3.5 text-black group-hover:text-white transition-colors" />
            <span className="hidden sm:inline">TERMINAL</span>
            <kbd className="hidden lg:inline text-[9px] px-1 py-0.5 bg-black text-white border border-black group-hover:border-white transition-colors">
              ^K
            </kbd>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="b-btn-dark p-1.5 md:hidden"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#000000] border-b-2 border-white px-6 py-4 mt-2 shadow-[0_6px_0px_#ffffff]">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = activeView === item.view;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.view)}
                  className={`text-left py-2.5 px-3 font-tech text-sm border-2 transition-all cursor-pointer ${
                    isActive
                      ? "bg-white text-black border-white font-bold shadow-[3px_3px_0px_#ffffff]"
                      : "bg-[#121212] hover:bg-white hover:text-black text-white border-[#262626] hover:border-white"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="pt-3 border-t-2 border-[#262626] flex items-center justify-between text-xs font-tech text-neutral-400">
              <span className="flex items-center gap-1.5 text-white font-bold">
                <Activity className="w-3.5 h-3.5" /> ONLINE
              </span>
              <span>{currentTime}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
