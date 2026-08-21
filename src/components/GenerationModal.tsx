import React, { useState, useEffect } from 'react';
import { X, Sparkles, CheckCircle2, Download, Copy, Check, RefreshCw, Wand2, Sliders, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ArtStyle, GenerationSettings } from '../types';

interface GenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStyles: ArtStyle[];
  settings: GenerationSettings;
}

export const GenerationModal: React.FC<GenerationModalProps> = ({
  isOpen,
  onClose,
  selectedStyles,
  settings,
}) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('正在初始化扩散模型权重...');
  const [isCompleted, setIsCompleted] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setIsCompleted(false);
      return;
    }

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      if (currentProgress <= 25) {
        setStatusText('步骤 1/4: 编码提示词与风格多模态特征...');
      } else if (currentProgress <= 65) {
        setStatusText(`步骤 2/4: 潜在空间反向去噪采样 (${Math.round((currentProgress - 25) * 0.75)}/30步)...`);
      } else if (currentProgress <= 90) {
        setStatusText('步骤 3/4: 注入选定艺术风格笔触与色彩调色盘...');
      } else if (currentProgress < 100) {
        setStatusText('步骤 4/4: 超清画质增强与细节渲染完成...');
      } else {
        currentProgress = 100;
        setStatusText('生成完成！作品已就绪');
        setIsCompleted(true);
        clearInterval(interval);
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#6366f1', '#a855f7', '#ec4899', '#3b82f6', '#10b981'],
          });
        } catch {
          // ignore if canvas-confetti is not loaded
        }
      }
      setProgress(currentProgress);
    }, 120);

    return () => clearInterval(interval);
  }, [isOpen, selectedStyles]);

  if (!isOpen) return null;

  const handleCopyPrompt = (promptText: string, index: number) => {
    navigator.clipboard.writeText(promptText);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const currentStyle = selectedStyles[activeTab] || selectedStyles[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-slate-900/95 border border-white/20 shadow-2xl overflow-hidden"
        style={{
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#070b10]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-400 to-emerald-500 flex items-center justify-center text-slate-950 shadow-md shadow-teal-500/30 font-bold">
              <Sparkles className="w-4 h-4 fill-slate-950" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                AI 艺术渲染工作台
                <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  {selectedStyles.length} 款风格
                </span>
              </h2>
              <p className="text-xs text-slate-400">比例: {settings.aspectRatio} · 画质: HD · 模型: v3.2</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#141c26] hover:bg-[#1a2533] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Progress Bar Section (When generating) */}
          {!isCompleted ? (
            <div className="p-6 rounded-2xl bg-[#090d14] border border-white/10 space-y-4">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-teal-300 flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-teal-400" />
                  {statusText}
                </span>
                <span className="text-white text-sm font-bold">{progress}%</span>
              </div>

              <div className="w-full h-3 rounded-full bg-[#151f2b] overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-teal-400 via-teal-500 to-emerald-400 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(20,184,166,0.8)]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Selected Styles Mini Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {selectedStyles.map((item) => (
                  <span
                    key={item.id}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#141b24] text-slate-300 text-xs border border-white/5"
                  >
                    <Wand2 className="w-3 h-3 text-teal-400" />
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-teal-950/40 border border-teal-500/30 flex items-center justify-between gap-3 text-teal-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-teal-400" />
                <span className="text-sm font-semibold">生成完毕！已成功合成 {selectedStyles.length} 组风格艺术画作</span>
              </div>
              <span className="text-xs text-teal-400/80">耗时 2.4s</span>
            </div>
          )}

          {/* Style Tabs if multiple selected */}
          {selectedStyles.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {selectedStyles.map((style, idx) => (
                <button
                  key={style.id}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    activeTab === idx
                      ? 'bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-bold shadow-md shadow-teal-500/30'
                      : 'bg-[#121922] text-slate-400 hover:text-slate-200 border border-white/5'
                  }`}
                >
                  <img
                    src={style.imageUrl}
                    alt={style.name}
                    referrerPolicy="no-referrer"
                    className="w-4 h-4 rounded-full object-cover"
                  />
                  <span>{style.name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Active Generated Artwork Preview & Prompt Details */}
          {currentStyle && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
              {/* Left: Image Render Canvas */}
              <div className="relative rounded-2xl overflow-hidden bg-black border border-white/15 aspect-square flex items-center justify-center group shadow-xl">
                <img
                  src={currentStyle.imageUrl}
                  alt={currentStyle.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090e]/90 via-transparent to-transparent" />

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="px-2 py-0.5 rounded-md bg-black/80 text-teal-300 font-bold border border-white/10">
                      {currentStyle.name}
                    </span>
                    <p className="text-[11px] text-slate-300 mt-1">{currentStyle.enName}</p>
                  </div>

                  <a
                    href={currentStyle.imageUrl}
                    target="_blank"
                    rel="noreferrer"
                    download={`ai-style-${currentStyle.id}.jpg`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-bold shadow-lg shadow-teal-500/40 transition-all active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>保存原图</span>
                  </a>
                </div>
              </div>

              {/* Right: Style Breakdown & AI Prompt */}
              <div className="space-y-4 text-xs">
                {/* Prompt Card */}
                <div className="p-4 rounded-2xl bg-[#090d14] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                      官方核心 Prompt 词根
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyPrompt(currentStyle.promptExample, activeTab)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#141b24] hover:bg-[#1c2633] text-teal-300 font-medium transition-all"
                    >
                      {copiedIndex === activeTab ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">已复制</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>复制 Prompt</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-slate-300 font-mono text-[11px] leading-relaxed bg-[#05070a] p-2.5 rounded-xl border border-white/5 select-all">
                    {currentStyle.promptExample}
                  </p>
                </div>

                {/* Characteristics */}
                <div className="p-4 rounded-2xl bg-[#090d14] border border-white/10 space-y-2">
                  <span className="font-bold text-slate-300">视觉特征分析</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {currentStyle.characteristics.map((c, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-teal-950/40 text-teal-200 border border-teal-500/20 text-[11px]">
                        ✓ {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Extracted Palette */}
                <div className="p-4 rounded-2xl bg-[#090d14] border border-white/10 space-y-2">
                  <span className="font-bold text-slate-300">风格色谱推荐</span>
                  <div className="flex items-center gap-2 pt-1">
                    {currentStyle.palette.map((color, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 bg-[#05070a] px-2 py-1 rounded-lg border border-white/5">
                        <div
                          className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                        <span className="font-mono text-[10px] text-slate-400">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-5 py-3.5 border-t border-white/10 bg-[#070b10]">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#141b24] hover:bg-[#1c2633] text-slate-200 font-medium text-xs transition-colors"
          >
            关闭窗口
          </button>
          <button
            type="button"
            onClick={() => {
              setProgress(0);
              setIsCompleted(false);
            }}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/30 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>重新采样生成</span>
          </button>
        </div>
      </div>
    </div>
  );
};
