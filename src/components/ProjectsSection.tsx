"use client";

import { useState } from "react";
import { soundFx } from "@/lib/audio";
import { PROJECTS, ProjectItem } from "@/data/portfolioData";
import { 
  ExternalLink, 
  CheckCircle2, 
  Activity, 
  TerminalSquare, 
  Radio,
  ChevronDown,
  Info,
  ArrowLeft
} from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";

interface ProjectsSectionProps {
  onBack?: () => void;
}

export default function ProjectsSection({ onBack }: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "live" | "soon" | "core">("all");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const filters = [
    { id: "all", label: "ALL_MISSIONS [04]" },
    { id: "live", label: "OPERATIONAL [01]" },
    { id: "soon", label: "R&D / #SOON [02]" },
    { id: "core", label: "CORE_TOOLS [01]" },
  ] as const;

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === "all") return true;
    return p.category === activeFilter;
  });

  const toggleExpand = (id: string) => {
    soundFx.playClick();
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const getAccentBorder = (color: ProjectItem["accentColor"]) => {
    switch (color) {
      case "white":
        return "border-2 border-white shadow-[6px_6px_0px_#ffffff]";
      case "gray":
        return "border-2 border-[#a3a3a3] shadow-[6px_6px_0px_#a3a3a3] hover:border-white hover:shadow-[6px_6px_0px_#ffffff]";
      case "black":
        return "border-2 border-white shadow-[6px_6px_0px_#ffffff]";
    }
  };

  const getBadgeStyle = (color: ProjectItem["accentColor"]) => {
    switch (color) {
      case "white":
        return "bg-white text-black font-bold font-tech border-2 border-white shadow-[2px_2px_0px_#ffffff]";
      case "gray":
        return "bg-[#262626] text-white font-bold font-tech border-2 border-[#a3a3a3]";
      case "black":
        return "bg-black text-white font-bold font-tech border-2 border-white";
    }
  };

  return (
    <section id="projects" className="py-12 relative z-10 min-h-[calc(100vh-4.5rem)] flex flex-col justify-between">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full space-y-6">
        
        {/* Navigation & Section Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-white pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-black border-2 border-white font-tech text-xs text-white shadow-[2px_2px_0px_#ffffff]">
              <TerminalSquare className="w-3.5 h-3.5 text-white" />
              <span>SYSTEM ARCHIVE // SECTOR_02</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-white tracking-tight">
              PROJECT DOSSIERS
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base max-w-xl font-sans">
              Interactive project dossiers engineered with modular stack architectures. Click any card to expand deep-subsystem specs.
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

        {/* Filter Pills Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="text-xs font-tech text-neutral-400 font-bold uppercase tracking-wider">
            MISSION CATEGORY FILTER:
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  soundFx.playClick();
                  setActiveFilter(f.id);
                }}
                onMouseEnter={() => soundFx.playHover()}
                className={`px-3.5 py-1.5 text-xs font-tech tracking-wider border-2 transition-all cursor-pointer ${
                  activeFilter === f.id
                    ? "b-btn-white py-1 px-3 text-xs"
                    : "b-btn-dark py-1 px-3 text-xs"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Single-Column Full-Width Vertical Stack */}
        <div className="flex flex-col gap-6">
          {filteredProjects.map((project) => {
            const isExpanded = expandedIds.has(project.id);
            return (
              <div
                key={project.id}
                className={`w-full b-card transition-all duration-150 flex flex-col justify-between group relative overflow-hidden ${getAccentBorder(
                  project.accentColor
                )}`}
              >
                {/* Mecha corner decorative notch */}
                <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden pointer-events-none">
                  <div className="absolute transform rotate-45 bg-white w-12 h-2 -top-1 -right-4" />
                </div>

                <div className="p-6 sm:p-7 space-y-4">
                  {/* Header: Codename & Status Pill */}
                  <div className="flex items-center justify-between gap-2 font-tech text-xs">
                    <span className="text-neutral-400 font-bold flex items-center gap-1.5">
                      <Radio className="w-3 h-3 text-white" />
                      {project.codename}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 text-[11px] ${getBadgeStyle(
                        project.accentColor
                      )}`}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* Project Title & Tagline */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif font-black text-white group-hover:text-neutral-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm font-tech text-neutral-300 mt-1 italic">
                      &quot;{project.tagline}&quot;
                    </p>
                  </div>

                  {/* Tech Stack Badges (Always visible summary) */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="b-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Expandable Dropdown Content Area */}
                  {isExpanded && (
                    <div className="pt-4 border-t-2 border-[#262626] space-y-4 animate-in fade-in duration-150">
                      {/* Description */}
                      <p className="text-neutral-300 text-sm leading-relaxed max-w-4xl font-sans">
                        {project.description}
                      </p>

                      {/* Feature Bullets */}
                      <div className="space-y-2">
                        <div className="text-[11px] font-tech text-neutral-400 uppercase tracking-wider font-bold">
                          KEY SUBSYSTEM CAPABILITIES:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {project.features.map((feat) => (
                            <div
                              key={feat}
                              className="flex items-start gap-2 text-xs text-neutral-200 font-normal p-2.5 bg-black border border-[#262626] font-tech"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Metrics Panel */}
                      {project.metrics && (
                        <div className="flex items-center justify-between text-xs font-tech text-white bg-black px-3.5 py-2.5 border border-white">
                          <span className="flex items-center gap-1.5 font-bold text-white">
                            <Activity className="w-3.5 h-3.5 text-white" />
                            METRICS:
                          </span>
                          <span className="font-semibold text-neutral-200">{project.metrics}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Footer: Action Buttons & Expand Toggle Button */}
                <div className="px-6 py-4 bg-black border-t-2 border-white flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => soundFx.playConfirm()}
                        className="group b-btn-white py-1.5 px-3 text-xs flex items-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-black group-hover:text-white transition-colors" />
                        <span>LAUNCH</span>
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => soundFx.playClick()}
                        className="group b-btn-dark py-1.5 px-3 text-xs flex items-center gap-1.5"
                      >
                        <GithubIcon className="w-3.5 h-3.5 text-white group-hover:text-black transition-colors" />
                        <span>SOURCE</span>
                      </a>
                    )}

                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setSelectedProject(project);
                      }}
                      className="px-2.5 py-2 bg-[#121212] hover:bg-white text-white hover:text-black border-2 border-white font-tech text-xs flex items-center gap-1 shadow-[2px_2px_0px_#ffffff] transition-all cursor-pointer"
                      title="Inspect full briefing"
                    >
                      <Info className="w-3.5 h-3.5 text-white hover:text-black transition-colors" />
                    </button>
                  </div>

                  {/* Dropdown Accordion Expand/Collapse Button */}
                  <button
                    onClick={() => toggleExpand(project.id)}
                    className="group b-btn-dark py-1.5 px-3 text-xs flex items-center gap-1.5 ml-auto"
                  >
                    <span>{isExpanded ? "[COLLAPSE DOSSIER]" : "[EXPAND DOSSIER]"}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-white group-hover:text-black transition-transform duration-150 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: Project Telemetry Inspector */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
            <div className="relative w-full max-w-2xl bg-[#121212] border-2 border-white p-6 sm:p-8 shadow-[8px_8px_0px_#ffffff] space-y-6">
              
              <div className="flex items-center justify-between border-b-2 border-white pb-4">
                <div>
                  <span className="font-tech text-xs text-neutral-400 font-bold block">
                    MISSION BRIEFING // {selectedProject.codename}
                  </span>
                  <h3 className="text-2xl font-serif font-black text-white">{selectedProject.title}</h3>
                </div>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedProject(null);
                  }}
                  className="px-3 py-1.5 bg-black hover:bg-white border-2 border-white text-white hover:text-black font-tech text-xs font-bold shadow-[2px_2px_0px_#ffffff] cursor-pointer transition-all"
                >
                  [CLOSE_HUD]
                </button>
              </div>

              <div className="space-y-4 text-sm text-neutral-300 leading-relaxed font-sans">
                <p>{selectedProject.description}</p>
                <div className="p-4 bg-black border border-white space-y-2 font-tech">
                  <div className="text-xs text-white font-bold">SYSTEM OBJECTIVES & ROADMAP</div>
                  <p className="text-xs text-neutral-400">
                    Engineered with modular state containers, atomic design principles, and automated CI/CD deployment pipelines.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedProject(null);
                  }}
                  className="px-4 py-2 bg-white hover:bg-black text-black hover:text-white border-2 border-white font-tech font-bold text-xs shadow-[3px_3px_0px_#ffffff] cursor-pointer transition-all"
                >
                  ACKNOWLEDGE
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
