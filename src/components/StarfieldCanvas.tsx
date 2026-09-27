"use client";

import { useEffect, useRef, useState } from "react";
import { soundFx } from "@/lib/audio";
import { Rocket, Zap } from "lucide-react";

interface Star {
  x: number;
  y: number;
  z: number;
  pz: number;
  size: number;
  color: string;
}

export default function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isWarping, setIsWarping] = useState(false);
  const isWarpingRef = useRef(false);
  const speedMultiplierRef = useRef(1.2);
  const warpTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  const toggleWarp = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    if (isWarping) {
      // Cancel immediately back to STANDBY
      clearTimeout(warpTimerRef.current);
      warpTimerRef.current = undefined;
      setIsWarping(false);
      isWarpingRef.current = false;
      soundFx.playClick();
    } else {
      // Engage hyper-velocity warp drive for exactly 3 seconds
      speedMultiplierRef.current = 35;
      isWarpingRef.current = true;
      setIsWarping(true);
      soundFx.playWarp();

      clearTimeout(warpTimerRef.current);
      warpTimerRef.current = setTimeout(() => {
        isWarpingRef.current = false;
        setIsWarping(false);
        warpTimerRef.current = undefined;
      }, 3000);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(warpTimerRef.current);
    };
  }, []);

  // Decoupled 60 FPS Canvas render loop (independent of isWarping state)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX - width / 2) * 0.05;
      mouseRef.current.targetY = (e.clientY - height / 2) * 0.05;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Dynamic scroll & wheel & touch warp boost
    let lastScrollY = window.scrollY;
    let scrollTimeout: NodeJS.Timeout;

    const triggerMicroWarp = () => {
      if (!isWarpingRef.current) {
        speedMultiplierRef.current = Math.max(speedMultiplierRef.current, 10);
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          // Accelerate back down smoothly
        }, 350);
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const speed = Math.abs(currentScrollY - lastScrollY);
      if (speed > 20) {
        triggerMicroWarp();
      }
      lastScrollY = currentScrollY;
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 6 || Math.abs(e.deltaX) > 6) {
        triggerMicroWarp();
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const delta = Math.abs(e.touches[0].clientY - touchStartY);
        if (delta > 8) {
          triggerMicroWarp();
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Initialize stars
    const starCount = 350;
    const stars: Star[] = [];
    const colors = ["#ffffff", "#e5e5e5", "#a3a3a3", "#737373"];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,
        pz: Math.random() * width,
        size: Math.random() * 1.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const render = () => {
      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const targetMultiplier = isWarpingRef.current ? 24 : 1.2;
      speedMultiplierRef.current += (targetMultiplier - speedMultiplierRef.current) * 0.08;
      const speed = speedMultiplierRef.current;

      // Dark fade trail for warp lines
      ctx.fillStyle = isWarpingRef.current ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.95)";
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2 + mouseRef.current.x;
      const cy = height / 2 + mouseRef.current.y;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.pz = star.z;
        star.z -= speed * 2.5;

        if (star.z <= 0) {
          star.z = width;
          star.pz = width;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        const k = 250 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const prevK = 250 / star.pz;
          const prevPx = star.x * prevK + cx;
          const prevPy = star.y * prevK + cy;

          const size = Math.max(0.6, (1 - star.z / width) * star.size * 2.2);
          const alpha = Math.min(1, Math.max(0.15, 1 - star.z / width));

          ctx.beginPath();
          if (speed > 3) {
            // Warp streak
            ctx.moveTo(prevPx, prevPy);
            ctx.lineTo(px, py);
            ctx.strokeStyle = star.color;
            ctx.lineWidth = size * (speed > 10 ? 1.8 : 1.2);
            ctx.globalAlpha = alpha;
            ctx.stroke();
          } else {
            // Dot particle
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fillStyle = star.color;
            ctx.globalAlpha = alpha;
            ctx.fill();
          }
          ctx.globalAlpha = 1;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <>
      {/* Background Canvas - Strictly z-0 */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <canvas ref={canvasRef} className="block w-full h-full" />
        <div className="absolute inset-0 bg-grid-tech opacity-30 pointer-events-none" />
        <div className="absolute inset-0 halftone-overlay opacity-30 pointer-events-none" />
      </div>

      {/* Floating Warp Drive Button - Top Level z-[100] */}
      <div className="fixed bottom-14 sm:bottom-16 left-6 z-[100] pointer-events-auto">
        <button
          type="button"
          onClick={toggleWarp}
          aria-label="Toggle warp drive"
          className={`group flex items-center gap-2 px-4 py-2.5 font-tech text-xs tracking-wider border-2 cursor-pointer transition-all duration-150 select-none ${
            isWarping
              ? "bg-white text-black border-white font-black shadow-[4px_4px_0px_#ffffff]"
              : "bg-black text-white border-white hover:bg-white hover:text-black font-bold shadow-[4px_4px_0px_#ffffff] hover:shadow-[2px_2px_0px_#ffffff] active:translate-x-[2px] active:translate-y-[2px]"
          }`}
        >
          {isWarping ? (
            <Zap className="w-4 h-4 text-black animate-spin shrink-0" />
          ) : (
            <Rocket className="w-4 h-4 text-white group-hover:text-black transition-colors shrink-0" />
          )}
          <span>WARP_DRIVE: {isWarping ? "[ONLINE]" : "[STANDBY]"}</span>
        </button>
      </div>
    </>
  );
}
