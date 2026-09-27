"use client";

import { useEffect, useRef, useState } from "react";
import { soundFx } from "@/lib/audio";
import { PILOT_PROFILE, RANDOM_FACTS } from "@/data/portfolioData";
import { Terminal as TerminalIcon, X, CornerDownLeft } from "lucide-react";

interface CommandTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LogEntry {
  type: "input" | "output" | "error" | "success";
  text: string;
}

export default function CommandTerminal({ isOpen, onClose }: CommandTerminalProps) {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>([
    { type: "output", text: "[name]_OS v2.4.0 [BRUTALIST MONOCHROME TERMINAL ACTIVE]" },
    { type: "output", text: "Type 'help' to display available flight console commands." },
  ]);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Keyboard shortcut listener (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        soundFx.playClick();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent
        }
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    soundFx.playConfirm();
    const newLogs: LogEntry[] = [...logs, { type: "input", text: `> ${cmd}` }];

    const lower = cmd.toLowerCase();

    if (lower === "help") {
      newLogs.push({
        type: "output",
        text: "AVAILABLE TELEMETRY COMMANDS:\n  help        - List all commands\n  projects    - List active missions & dossiers\n  anime       - Display top anime inspirations\n  fact        - Draw a random lore fact\n  warp        - Engage hyper-space warp drive\n  contact     - Transmit comms packet\n  sudo hire   - Initialize direct recruitment link\n  clear       - Clear cockpit display buffer\n  exit        - Close cockpit terminal",
      });
    } else if (lower === "projects") {
      newLogs.push({
        type: "output",
        text: "MISSION DOSSIERS:\n  [01] PROJECT_[name]_ZERO (Portfolio v1) [OPERATIONAL]\n  [02] PROJECT_VALKYRIE_01 (Neural Task Engine) [R&D / #SOON]\n  [03] PROJECT_EVA_SYNC (Anime Tracker) [R&D / #SOON]\n  [04] PROJECT_THRUSTER (HyperDrive CLI) [IN_ORBIT]",
      });
    } else if (lower === "anime") {
      newLogs.push({
        type: "output",
        text: "INSPIRATION ARCHIVE:\n  • Neon Genesis Evangelion (Mecha Cockpit aesthetics)\n  • Cyberpunk: Edgerunners (Monochrome brutalist energy)\n  • Gundam: Witch from Mercury (Clean aerospace UI)\n  • Cowboy Bebop (Space exploration lore)",
      });
    } else if (lower === "fact") {
      const randomF = RANDOM_FACTS[Math.floor(Math.random() * RANDOM_FACTS.length)];
      newLogs.push({
        type: "success",
        text: `[LORE #${randomF.id}] ${randomF.fact}`,
      });
    } else if (lower === "warp") {
      soundFx.playWarp();
      newLogs.push({
        type: "success",
        text: "WARP DRIVE ENGAGED // ACCELERATING STARFIELD TO HYPER-VELOCITY...",
      });
    } else if (lower === "sudo hire" || lower === "hire") {
      newLogs.push({
        type: "success",
        text: `DIRECT RECRUITMENT PROTOCOL INITIATED!\nComms Email: ${PILOT_PROFILE.socials.email}\nStatus: Available for Full-Stack / Frontend Engineering roles!`,
      });
    } else if (lower === "contact") {
      newLogs.push({
        type: "output",
        text: `COMMS RADAR:\nEmail: ${PILOT_PROFILE.socials.email}\nGitHub: ${PILOT_PROFILE.socials.github}\nLinkedIn: ${PILOT_PROFILE.socials.linkedin}`,
      });
    } else if (lower === "clear") {
      setLogs([]);
      setInput("");
      return;
    } else if (lower === "exit") {
      onClose();
      return;
    } else {
      newLogs.push({
        type: "error",
        text: `Command not recognized: '${cmd}'. Type 'help' for command directory.`,
      });
    }

    setLogs(newLogs);
    setInput("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
      <div className="relative w-full max-w-2xl bg-[#121212] border-2 border-white shadow-[8px_8px_0px_#ffffff] overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Terminal Header */}
        <div className="bg-black px-4 py-3 border-b-2 border-white flex items-center justify-between font-tech text-xs text-white">
          <div className="flex items-center gap-2 font-bold">
            <TerminalIcon className="w-4 h-4 text-white" />
            <span>[name]_OS // FLIGHT_CONSOLE_TERMINAL</span>
          </div>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-1 bg-black hover:bg-white text-white hover:text-black border-2 border-white shadow-[2px_2px_0px_#ffffff] cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Output Area */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-2 font-tech text-xs sm:text-sm flex-1 bg-black text-neutral-300">
          {logs.map((log, idx) => (
            <div
              key={idx}
              className={`whitespace-pre-wrap leading-relaxed ${
                log.type === "input"
                  ? "text-white font-bold"
                  : log.type === "error"
                  ? "text-white bg-[#121212] border-l-2 border-white pl-2 font-bold"
                  : log.type === "success"
                  ? "text-white font-bold bg-[#262626] px-1.5 py-0.5 border border-white inline-block"
                  : "text-neutral-300"
              }`}
            >
              {log.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Line */}
        <form
          onSubmit={handleCommand}
          className="p-3 bg-[#121212] border-t-2 border-white flex items-center gap-2"
        >
          <span className="text-white font-tech font-bold text-sm">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help', 'projects', 'fact', 'warp'..."
            className="flex-1 bg-transparent font-tech text-xs sm:text-sm text-white focus:outline-none placeholder-neutral-500"
          />
          <button
            type="submit"
            className="px-3.5 py-1.5 bg-white hover:bg-black text-black hover:text-white font-tech font-bold text-xs flex items-center gap-1.5 border-2 border-white shadow-[3px_3px_0px_#ffffff] cursor-pointer transition-all"
          >
            <span>SEND</span>
            <CornerDownLeft className="w-3 h-3" />
          </button>
        </form>

      </div>
    </div>
  );
}
