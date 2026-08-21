import React, { useState } from 'react';
import { X, Check, Sparkles, Copy, Sliders, Palette, Layers, ExternalLink } from 'lucide-react';
import { ArtStyle } from '../types';

interface StyleDetailModalProps {
  styleItem: ArtStyle | null;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onClose: () => void;
}

export const StyleDetailModal: React.FC<StyleDetailModalProps> = ({
  styleItem,
  isSelected,
  onToggleSelect,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [weight, setWeight] = useState(styleItem?.modelWeight || 0.85);

  if (!styleItem) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(styleItem.promptExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-slate-900/95 border border-white/20 shadow-2xl overflow-hidden"
        style={{
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#070b10]">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
              {styleItem.badge}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-white">
              {styleItem.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#141c26] hover:bg-[#1a2533] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Main Showcase Hero */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-black border border-white/15 shadow-xl">
            <img
              src={styleItem.imageUrl}
              alt={styleItem.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090e]/95 via-[#07090e]/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-sm sm:text-base font-medium text-slate-200">
                {styleItem.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {styleItem.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[11px] text-teal-300 border border-white/15"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Prompt Formula */}
          <div className="p-4 rounded-2xl bg-[#090d14] border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                Prompt 风格核心词
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#141b24] hover:bg-[#1c2633] text-teal-300 text-xs font-medium transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">已复制</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>复制</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-slate-300 font-mono text-xs leading-relaxed bg-[#05070a] p-2.5 rounded-xl border border-white/5 select-all">
              {styleItem.promptExample}
            </p>
          </div>

          {/* Visual Characteristics */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-300">核心艺术特征</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {styleItem.characteristics.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-[#090d14] border border-white/10 text-xs text-slate-300">
                  <span className="text-teal-400 font-bold mr-1">0{idx + 1}.</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Palette and Model Weight */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Palette */}
            <div className="p-3.5 rounded-2xl bg-[#090d14] border border-white/10 space-y-2">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-teal-400" />
                代表性调色盘
              </span>
              <div className="flex items-center gap-2">
                {styleItem.palette.map((color, idx) => (
                  <div key={idx} className="flex-1 h-7 rounded-lg shadow-sm border border-white/20" style={{ backgroundColor: color }} title={color} />
                ))}
              </div>
            </div>

            {/* Model Weight Slider */}
            <div className="p-3.5 rounded-2xl bg-[#090d14] border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-teal-400" />
                  风格渲染强度
                </span>
                <span className="text-teal-300 font-mono font-bold">{(weight * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.3"
                max="1.0"
                step="0.05"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#151f2b] rounded-lg appearance-none cursor-pointer accent-teal-400"
              />
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-white/10 bg-[#070b10]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#141b24] hover:bg-[#1c2633] text-slate-300 text-xs font-medium transition-colors"
          >
            返回列表
          </button>

          <button
            type="button"
            onClick={() => {
              onToggleSelect(styleItem.id);
            }}
            className={`inline-flex items-center gap-2 px-6 py-2 rounded-xl font-bold text-xs shadow-lg transition-all active:scale-95 ${
              isSelected
                ? 'bg-rose-600/90 hover:bg-rose-500 text-white shadow-rose-600/30'
                : 'bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-bold shadow-teal-500/40'
            }`}
          >
            {isSelected ? (
              <>
                <X className="w-3.5 h-3.5" />
                <span>取消选中该风格</span>
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>选中并应用此风格</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
