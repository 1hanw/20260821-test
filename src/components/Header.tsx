import React from 'react';
import { ArrowLeft, Home } from 'lucide-react';

interface HeaderProps {
  onResetSelection?: () => void;
  selectedCount: number;
  totalCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onResetSelection,
  selectedCount,
  totalCount,
}) => {
  return (
    <header className="relative z-30 w-full pt-2 sm:pt-4 pb-2 px-3 sm:px-6 max-w-6xl mx-auto flex flex-col gap-2 sm:gap-3">
      {/* Top Utility Bar with Back on Left and Home on Right */}
      <div className="flex items-center justify-between w-full">
        {/* Left: Back Button */}
        <button
          type="button"
          id="btn-nav-back"
          onClick={() => {
            if (window.history.length > 1) {
              window.history.back();
            } else if (onResetSelection) {
              onResetSelection();
            }
          }}
          className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-[#0e131b]/80 hover:bg-[#151c27] text-slate-200 hover:text-white border border-white/10 hover:border-teal-500/40 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-sm transition-all duration-200 active:scale-95 touch-manipulation"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-400" />
          <span>返回</span>
        </button>

        {/* Right: Home Button */}
        <button
          type="button"
          id="btn-nav-home"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-[#0e131b]/80 hover:bg-[#151c27] text-slate-200 hover:text-white border border-white/10 hover:border-teal-500/40 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-sm transition-all duration-200 active:scale-95 touch-manipulation"
        >
          <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-400" />
          <span>主页</span>
        </button>
      </div>

      {/* Main Title Section with Geometric Cyber-Teal Accent Motif */}
      <div className="flex flex-col items-center justify-center text-center mt-0.5 sm:mt-1">
        <div className="relative inline-flex items-center justify-center gap-2.5 sm:gap-3">
          {/* Futuristic Angled Teal-Cyan Bar Accent */}
          <div className="w-2.5 h-6 sm:w-3.5 sm:h-8 md:h-9 bg-gradient-to-tr from-teal-500 via-emerald-400 to-cyan-300 transform -skew-x-12 rounded-sm shadow-[0_0_15px_rgba(20,184,166,0.6)]" />

          {/* Primary Heading */}
          <h1 className="text-lg sm:text-2xl md:text-3xl font-extrabold tracking-wider text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            选择要生成的样式
          </h1>
        </div>

        {/* Subtitle / Status */}
        <div className="flex items-center gap-2 mt-1">
          <span className="h-px w-5 sm:w-8 bg-gradient-to-r from-transparent to-teal-500/60" />
          <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-teal-300 uppercase">
            SELECT ART STYLE PRESET
          </span>
          <span className="h-px w-5 sm:w-8 bg-gradient-to-l from-transparent to-teal-500/60" />
        </div>
      </div>
    </header>
  );
};
