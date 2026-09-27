"use client";

import { useState } from "react";
import { soundFx } from "@/lib/audio";
import { PILOT_PROFILE } from "@/data/portfolioData";
import { 
  Radio, 
  Copy, 
  Check, 
  Mail, 
  ExternalLink,
  ArrowLeft,
  MapPin,
  Clock,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { GithubIcon, LinkedinIcon, DiscordIcon, TwitterIcon } from "@/components/BrandIcons";

interface ContactSectionProps {
  onBack?: () => void;
}

export default function ContactSection({ onBack }: ContactSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDiscord, setCopiedDiscord] = useState(false);

  const handleCopyEmail = () => {
    soundFx.playConfirm();
    navigator.clipboard.writeText(PILOT_PROFILE.socials.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyDiscord = () => {
    soundFx.playConfirm();
    navigator.clipboard.writeText(PILOT_PROFILE.socials.discord);
    setCopiedDiscord(true);
    setTimeout(() => setCopiedDiscord(false), 2500);
  };

  return (
    <section id="comms" className="py-12 relative z-10 min-h-[calc(100vh-4.5rem)] flex flex-col justify-between">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full space-y-8">
        
        {/* Navigation & Section Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-white pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-black border-2 border-white font-tech text-xs text-white shadow-[2px_2px_0px_#ffffff]">
              <Radio className="w-3.5 h-3.5 text-white" />
              <span>MISSION CONTROL COMMS // SECTOR_05</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-white tracking-tight">
              DIRECT TRANSMISSION
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base max-w-xl font-sans">
              Open communication radar for engineering contracts, full-stack recruitment, or technical collaboration.
            </p>
          </div>

          {onBack && (
            <button
              onClick={() => {
                soundFx.playClick();
                onBack();
              }}
              onMouseEnter={() => soundFx.playHover()}
              className="group self-start sm:self-center b-btn-white text-xs flex items-center gap-2 shrink-0"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>[BACK TO WELCOME]</span>
            </button>
          )}
        </div>

        {/* Direct Comms Radar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 7 Columns: Prominent Email Transmission Box & Quick Info */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Primary Email Channel Card */}
            <div className="b-card p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b-2 border-white pb-4 font-tech text-xs">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Mail className="w-4 h-4 text-white" />
                  <span>PRIMARY COMMS DISPATCH</span>
                </div>
                <span className="b-tag font-bold">
                  SECURE & DIRECT
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-tech text-neutral-400 font-bold uppercase tracking-wider block">
                  TRANSMISSION DESTINATION // EMAIL
                </span>
                <div className="p-4 b-card-dark flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2.5 bg-[#121212] border border-white text-white shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="font-tech text-sm sm:text-base text-white font-bold truncate">
                      {PILOT_PROFILE.socials.email}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={handleCopyEmail}
                      onMouseEnter={() => soundFx.playHover()}
                      className="b-btn-dark py-1.5 px-3 text-xs flex items-center gap-1.5"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedEmail ? "COPIED" : "COPY"}</span>
                    </button>

                    <a
                      href={`mailto:${PILOT_PROFILE.socials.email}`}
                      onClick={() => soundFx.playConfirm()}
                      className="b-btn-white py-1.5 px-3 text-xs flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>OPEN CLIENT</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-black border border-white text-xs font-tech text-neutral-300 space-y-2">
                <div className="text-white font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span>COMMUNICATION TELEMETRY GUIDELINES:</span>
                </div>
                <p className="text-neutral-400 leading-relaxed font-sans">
                  Preferred subjects include full-time engineering roles, frontend UI contracts, high-concurrency Node.js builds, or engineering discussions. Typical response latency is within 24 standard Earth hours.
                </p>
              </div>
            </div>

            {/* Telemetry Status Readout */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-tech">
              <div className="p-3.5 b-card space-y-1 transition-all">
                <span className="text-neutral-400 text-[10px] block font-bold">SECTOR POSITION</span>
                <span className="text-white font-bold flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-white" />
                  {PILOT_PROFILE.location}
                </span>
              </div>
              <div className="p-3.5 b-card space-y-1 transition-all">
                <span className="text-neutral-400 text-[10px] block font-bold">LOGGED FLIGHT TIME</span>
                <span className="text-white font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-white" />
                  {PILOT_PROFILE.flightHours}
                </span>
              </div>
              <div className="p-3.5 b-card space-y-1 transition-all">
                <span className="text-neutral-400 text-[10px] block font-bold">RADAR STATUS</span>
                <span className="text-white font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-white" />
                  ONLINE // OPEN
                </span>
              </div>
            </div>

          </div>

          {/* Right 5 Columns: Social Radar Nodes */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="b-card p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between border-b-2 border-white pb-3 font-tech text-xs">
                <span className="text-white font-bold tracking-wider">
                  EXTERNAL RADAR NODES
                </span>
                <span className="text-neutral-400 text-[10px]">4 NETWORK LINKS</span>
              </div>

              <div className="grid grid-cols-1 gap-3 font-tech text-xs">
                {/* GitHub */}
                <a
                  href={PILOT_PROFILE.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="p-3.5 bg-black border-2 border-[#262626] hover:border-white hover:bg-[#262626] text-white flex items-center justify-between transition-all cursor-pointer shadow-[3px_3px_0px_#262626] hover:shadow-[3px_3px_0px_#ffffff] group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-[#121212] border border-white text-white group-hover:bg-white group-hover:text-black transition-colors">
                      <GithubIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold block">GITHUB RADAR</span>
                      <span className="text-[10px] text-neutral-400 font-sans">Repositories & Code Commits</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                </a>

                {/* LinkedIn */}
                <a
                  href={PILOT_PROFILE.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="p-3.5 bg-black border-2 border-[#262626] hover:border-white hover:bg-[#262626] text-white flex items-center justify-between transition-all cursor-pointer shadow-[3px_3px_0px_#262626] hover:shadow-[3px_3px_0px_#ffffff] group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-[#121212] border border-white text-white group-hover:bg-white group-hover:text-black transition-colors">
                      <LinkedinIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold block">LINKEDIN NETWORK</span>
                      <span className="text-[10px] text-neutral-400 font-sans">Professional Dossier & Endorsements</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                </a>

                {/* Discord */}
                <div className="p-3.5 bg-black border-2 border-[#262626] text-white flex items-center justify-between shadow-[3px_3px_0px_#262626]">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-[#121212] border border-white text-white">
                      <DiscordIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold block">DISCORD COMMS</span>
                      <span className="text-[10px] text-neutral-400 font-sans">{PILOT_PROFILE.socials.discord}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyDiscord}
                    onMouseEnter={() => soundFx.playHover()}
                    className="px-2.5 py-1.5 bg-black hover:bg-white text-white hover:text-black border-2 border-white font-tech text-xs font-bold flex items-center gap-1 cursor-pointer transition-all shadow-[2px_2px_0px_#ffffff]"
                  >
                    {copiedDiscord ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedDiscord ? "COPIED" : "COPY"}</span>
                  </button>
                </div>

                {/* Twitter / X */}
                <a
                  href={PILOT_PROFILE.socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="p-3.5 bg-black border-2 border-[#262626] hover:border-white hover:bg-[#262626] text-white flex items-center justify-between transition-all cursor-pointer shadow-[3px_3px_0px_#262626] hover:shadow-[3px_3px_0px_#ffffff] group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-[#121212] border border-white text-white group-hover:bg-white group-hover:text-black transition-colors">
                      <TwitterIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold block">TWITTER / X FEED</span>
                      <span className="text-[10px] text-neutral-400 font-sans">Aero & Tech Broadcasts</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
