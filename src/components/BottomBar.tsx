import React from 'react';
import { Sparkles, CheckCheck, Trash2, Sliders, Image as ImageIcon } from 'lucide-react';
import { ArtStyle, GenerationSettings } from '../types';

interface BottomBarProps {
  selectedStyles: ArtStyle[];
  totalStylesCount: number;
  onSelectAll: () => void;
  onClearAll: () => void;
  onOpenGenerate: () => void;
  settings: GenerationSettings;
  onUpdateSettings: (newSettings: Partial<GenerationSettings>) => void;
  isKioskMode?: boolean;
}

export const BottomBar: React.FC<BottomBarProps> = ({
  selectedStyles,
  totalStylesCount,
  onSelectAll,
  onClearAll,
  onOpenGenerate,
  settings,
  onUpdateSettings,
  isKioskMode = false,
}) => {
  const count = selectedStyles.length;
  const isAllSelected = count === totalStylesCount;

  return (
    <div
      id="bottom-action-bar"
      className="fixed bottom-0 left-0 right-0 z-40 w-full pointer-events-none px-3 sm:px-6 pb-3 sm:pb-4 pt-2 transition-all duration-300"
    >
      <div className="max-w-5xl md:max-w-6xl mx-auto pointer-events-auto">
        <div className="relative rounded-2xl md:rounded-3xl bg-[#0b0f14]/90 backdrop-blur-2xl border border-white/15 p-2.5 sm:p-3.5 shadow-2xl shadow-black/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Subtle Ambient Top Border Glow */}
          <div className="absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-teal-400/80 to-transparent" />

        {/* Left Options / Quick Controls */}
        <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-2">
          <div className="flex items-center gap-1.5">
            {/* Select All Button (Icon on mobile, Icon + Text on sm+) */}
            <button
              type="button"
              id="btn-bottom-select-all"
              onClick={onSelectAll}
              className={`w-9 h-9 sm:w-auto sm:h-auto inline-flex items-center justify-center sm:gap-1.5 p-0 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold backdrop-blur-md transition-all active:scale-95 touch-manipulation border flex-shrink-0 ${
                isAllSelected
                  ? 'bg-teal-500/20 text-teal-300 border-teal-500/50 shadow-sm shadow-teal-500/20'
                  : 'bg-[#121820]/80 hover:bg-[#18202b] text-slate-200 hover:text-white border-white/10'
              }`}
              title="全选所有艺术风格"
              aria-label="全选风格"
            >
              <CheckCheck className="w-4 h-4 text-teal-400" />
              <span className="hidden sm:inline">全选风格</span>
            </button>

            {/* Clear All Button (Icon on mobile, Icon + Text on sm+) */}
            {count > 0 && (
              <button
                type="button"
                id="btn-bottom-clear-all"
                onClick={onClearAll}
                className="w-9 h-9 sm:w-auto sm:h-auto inline-flex items-center justify-center sm:gap-1.5 p-0 sm:px-3 sm:py-2 rounded-xl bg-[#121820]/80 hover:bg-rose-950/40 text-slate-300 hover:text-rose-300 border border-white/10 hover:border-rose-500/40 text-xs font-semibold backdrop-blur-md transition-all active:scale-95 touch-manipulation animate-in fade-in duration-200 flex-shrink-0"
                title="一键清空已选风格"
                aria-label="一键清除"
              >
                <Trash2 className="w-4 h-4 text-rose-400" />
                <span className="hidden sm:inline">一键清除</span>
              </button>
            )}
          </div>

          {/* Aspect Ratio Selector Chips */}
          <div className="flex items-center gap-1 bg-[#070a0e]/80 p-1 rounded-xl border border-white/10 flex-shrink-0">
            {(['1:1', '4:3', '16:9', '9:16'] as const).map((ratio) => (
              <button
                key={ratio}
                type="button"
                id={`btn-ratio-${ratio.replace(':', '-')}`}
                onClick={() => onUpdateSettings({ aspectRatio: ratio })}
                className={`px-2 sm:px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all touch-manipulation ${
                  settings.aspectRatio === ratio
                    ? 'bg-teal-400 text-slate-950 font-bold shadow-sm shadow-teal-400/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title={`生成画幅比例: ${ratio}`}
              >
                {ratio}
              </button>
            ))}
          </div>

          {/* Quality Chip */}
          <div className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#070a0e]/80 border border-white/10 text-[11px] text-slate-300">
            <Sliders className="w-3 h-3 text-teal-400" />
            <span>HD 画质</span>
          </div>
        </div>

        {/* Right: Primary Call to Action Button */}
        <div className="w-full sm:w-auto flex items-center justify-end gap-2">
          {/* Selected Style Mini Thumbnails Preview */}
          {count > 0 && (
            <div className="hidden sm:flex items-center -space-x-2 mr-2">
              {selectedStyles.slice(0, 3).map((item) => (
                <img
                  key={item.id}
                  src={item.imageUrl}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full object-cover border-2 border-slate-950 shadow-sm"
                />
              ))}
              {count > 3 && (
                <div className="w-7 h-7 rounded-full bg-[#151e28] border-2 border-slate-950 flex items-center justify-center text-[10px] font-bold text-slate-200">
                  +{count - 3}
                </div>
              )}
            </div>
          )}

          {/* Dynamic Generate Button in Luminous Mint/Teal Gradient */}
          <button
            type="button"
            id="btn-primary-generate"
            disabled={count === 0}
            onClick={onOpenGenerate}
            className={`w-full sm:w-auto min-w-[160px] md:min-w-[180px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base tracking-wide transition-all duration-300 transform-gpu active:scale-95 touch-manipulation ${
              count > 0
                ? 'bg-gradient-to-r from-teal-400 via-teal-500 to-emerald-400 text-slate-950 font-extrabold shadow-lg shadow-teal-500/40 hover:shadow-teal-500/60 hover:scale-[1.02] border border-teal-300/40 cursor-pointer'
                : 'bg-[#141b24] text-slate-500 border border-white/5 cursor-not-allowed'
            }`}
          >
            <Sparkles className={`w-4 h-4 sm:w-5 sm:h-5 ${count > 0 ? 'text-slate-950 fill-slate-950 animate-pulse' : 'text-slate-500'}`} />
            <span>{count > 0 ? `生成 (${count})` : '请选择样式'}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};
